import { Controller } from 'react-hook-form'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@salarly/ui/components/field'
import { Input } from '@salarly/ui/components/input'
import { Textarea } from '@salarly/ui/components/textarea'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@salarly/ui/components/select'
import { Checkbox } from '@salarly/ui/components/checkbox'
import type { ChangeEventHandler, ComponentProps, ReactNode } from 'react'
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'

type FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  formName: TName
  formLabel: ReactNode
  formDescription?: ReactNode
  formControl: ControllerProps<
    TFieldValues,
    TName,
    TTransformedValues
  >['control']
}

type FormBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormControlProps<TFieldValues, TName, TTransformedValues> & {
  formHorizontal?: boolean
  formControlFirst?: boolean
  formClassName?: string
  children: (
    field: Parameters<
      ControllerProps<TFieldValues, TName, TTransformedValues>['render']
    >[0]['field'] & {
      'aria-invalid': boolean
      id: string
    },
  ) => ReactNode
}

type FormControlFunc<
  TExtraProps extends Record<string, unknown> = Record<never, never>,
> = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(
  props: FormControlProps<TFieldValues, TName, TTransformedValues> &
    TExtraProps,
) => ReactNode

function FormBase<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  children,
  formControl,
  formLabel,
  formName,
  formDescription,
  formControlFirst,
  formHorizontal,
  formClassName,
}: FormBaseProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <Controller
      control={formControl}
      name={formName}
      render={({ field, fieldState }) => {
        const labelElement = (
          <>
            <FieldLabel htmlFor={field.name}>{formLabel}</FieldLabel>
            {formDescription && (
              <FieldDescription>{formDescription}</FieldDescription>
            )}
          </>
        )

        const control = children({
          ...field,
          id: field.name,
          'aria-invalid': fieldState.invalid,
        })

        const errorElem = fieldState.invalid && (
          <FieldError errors={[fieldState.error]} />
        )

        return (
          <Field
            data-invalid={fieldState.invalid}
            orientation={formHorizontal ? 'horizontal' : undefined}
            className={formClassName}
          >
            {formControlFirst ? (
              <>
                {control}
                <FieldContent>
                  {labelElement}
                  {errorElem}
                </FieldContent>
              </>
            ) : (
              <>
                <FieldContent>{labelElement}</FieldContent>
                {control}
                {errorElem}
              </>
            )}
          </Field>
        )
      }}
    />
  )
}

type FormInputProps = FormControlFunc<Omit<ComponentProps<typeof Input>, 'ref'>>

export const FormInput: FormInputProps = (props) => {
  const {
    formControl,
    formLabel,
    formDescription,
    formName,
    children,
    ...rest
  } = props
  const base = { formControl, formLabel, formName, formDescription, children }
  return (
    <FormBase {...base}>{(field) => <Input {...rest} {...field} />}</FormBase>
  )
}

export const FormFileInput: FormControlFunc<{
  onChange?: (url: string) => void
}> = (props) => {
  return (
    <FormBase {...props}>
      {(field) => {
        const { value, ...rest } = field

        const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
          if (e.target.files) {
            const file = e.target.files[0]
            field.onChange(file)
            if (props.onChange) {
              props.onChange(URL.createObjectURL(file))
            }
          }
        }
        return <Input type='file' {...rest} onChange={handleFileUpload} />
      }}
    </FormBase>
  )
}

type FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormControlProps<TFieldValues, TName, TTransformedValues> &
  Omit<ComponentProps<typeof Textarea>, 'ref'>

export function FormTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: FormTextareaProps<TFieldValues, TName, TTransformedValues>) {
  const {
    formControl,
    formDescription,
    formLabel,
    formName,
    children,
    ...rest
  } = props
  const base = { formControl, formDescription, formLabel, formName, children }
  return (
    <FormBase {...base}>
      {(field) => <Textarea {...field} {...rest} />}
    </FormBase>
  )
}

type FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormControlProps<TFieldValues, TName, TTransformedValues> &
  ComponentProps<typeof Select> & { selectChildren: ReactNode }

export function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: FormSelectProps<TFieldValues, TName, TTransformedValues>) {
  const {
    formControl,
    formDescription,
    formLabel,
    formName,
    children,
    ...rest
  } = props
  const base = { formControl, formDescription, formLabel, formName, children }

  return (
    <FormBase {...base}>
      {({ onChange, onBlur, ...field }) => (
        <Select {...field} {...rest} onValueChange={onChange}>
          <SelectTrigger
            aria-invalid={field['aria-invalid']}
            id={field.id}
            onBlur={onBlur}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>{rest.selectChildren}</SelectContent>
        </Select>
      )}
    </FormBase>
  )
}

type FormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormControlProps<TFieldValues, TName, TTransformedValues> &
  ComponentProps<typeof Checkbox>

export function FormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: FormCheckboxProps<TFieldValues, TName, TTransformedValues>) {
  const {
    formControl,
    formDescription,
    formLabel,
    formName,
    children,
    ...rest
  } = props
  const base = { formControl, formDescription, formLabel, formName, children }

  return (
    <FormBase {...base}>
      {({ onChange, value, ...field }) => {
        const actualChecked = rest.checked ?? value

        const handleCheckedChange = (nextChecked: boolean) => {
          onChange(nextChecked)
          rest.onCheckedChange?.(nextChecked)
        }

        return (
          <Checkbox
            {...field}
            {...rest}
            checked={actualChecked}
            onCheckedChange={handleCheckedChange}
          />
        )
      }}
    </FormBase>
  )
}
