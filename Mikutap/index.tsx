import React, { useState, useEffect } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'dva'
import { ListPage } from '@sisyphe/components'
import { FormInstance } from 'antd/lib/form'
import { DynamicFormProps } from '@sisyphe/components/es/DynamicForm'

const selector = ({ list, loading }) => ({
  list: list.list,
  pagination: list.pagination,
  loading: loading.effects['list/list'],
})

export const filterConfig: DynamicFormProps['fields'] = []

const columns = []

export default () => {
  const { list, pagination, loading } = useSelector(selector, shallowEqual)

  const [form, setForm] = useState<FormInstance | null>(null)
  const dispatch = useDispatch()

  const onFinish = values => {}

  useEffect(() => {}, [])

  return (
    <ListPage
      title="ListPage"
      filter={{
        form: {
          onFinish,
        },
        fields: filterConfig,
        actions: {
          pageChange: (pageNum, pageSize, params) => {
            onFinish({
              ...params,
              pageNum,
              pageSize,
            })
          },
          formReset: () => {
            const value = form?.getFieldsValue()
            onFinish(value)
          },
        },
        getForm: setForm,
      }}
      table={{
        columns,
        pagination,
        dataSource: list,
      }}
      loading={loading}
    />
  )
}
