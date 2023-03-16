import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'

import ButtonLayout from '../layout/ButtonLayout'
import ModalLayout from '../layout/ModalLayout'
import AuthService from '../../Services/AuthService'
import MessageError from '../MessageError'

const AdminPanel = () => {

  const [open, setOpen] = useState(false)
  const [messageModal, setMessageModal] = useState('')
  const [message, setMessage] = useState(null)

  const [columns] = useState([
    { title: 'pseudo', field: 'username' },
    { title: 'Email', field: 'email' },
    { title: 'ID', field: '_id', editable: false },
    { title: 'Rôle', field: 'role' },
    { title: 'vehicle', field: 'vehicle.year' }
  ])

  const [datas, setDatas] = useState([
    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
  ])

  useEffect(() => {
    try {
      AuthService.getUsers().then(res => {
        const { users } = res.data
        datas[0].name === 'Mehmet' && setDatas(users)
      })
    } catch (error) {
      throw error
    }
  }, [datas, setDatas])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async (index) => {
    const idUser = { idUser: datas[index]._id }
    try {
      const res = await AuthService.deleteUser(idUser)
      setMessageModal(res.data.message)
      handleOpen()
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  const handleUpdate = async (newData, oldData) => {
    try {
      const dataUpdate = [...datas]
      const index = oldData.tableData.id
      dataUpdate[index] = newData
      await setDatas([...dataUpdate])

      const user = newData

      const res = await AuthService.updateUser(user)
      setMessageModal(res.data.message)
      handleOpen()
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  return (
    <div>
      <MaterialTable
        title="Editable Preview"
        columns={columns}
        data={datas}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setDatas([...datas, newData])

                resolve()
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleUpdate(newData, oldData)
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...datas]
                const index = oldData.tableData.id
                dataDelete.splice(index, 1)
                setDatas([...dataDelete])
                handleDelete(index)
                resolve()
              }, 1000)
            }),
        }}
      />
      {message ? <MessageError message={message} /> : null}
      <ModalLayout
        open={open}
        onClose={handleClose}
      >
        <h2 id="transition-modal-title">{messageModal}</h2>
        <ButtonLayout type='button' onClick={() => handleClose()}>
          Ok !
        </ButtonLayout>
      </ModalLayout>
    </div>
  )
}

export default AdminPanel

