import React, { useState, useEffect } from 'react'
import Env from '../config/env.config'
import { strings as commonStrings } from '../lang/common'
import { strings as ulStrings } from '../lang/user-list'
import * as UserService from '../services/UserService'
import * as Helper from '../common/Helper'
import Master from '../components/Master'
import Backdrop from '../components/SimpleBackdrop'
import Avatar from '../components/Avatar'
import BookingList from '../components/BookingList'
import NoMatch from './NoMatch'
import { Typography, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip } from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import * as SupplierService from '../services/SupplierService'
import { useNavigate } from 'react-router-dom'

import '../assets/css/user.css'

const User = () => {
  const navigate = useNavigate()
  const statuses = Helper.getBookingStatuses().map((status) => status.value)

  const [loggedUser, setLoggedUser] = useState()
  const [user, setUser] = useState()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [noMatch, setNoMatch] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [companies, setCompanies] = useState([])
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (visible) {
      setOffset(document.querySelector('.col-1').clientHeight)
    }
  }, [visible])

  const onBeforeUpload = () => {
    setLoading(true)
  }

  const onAvatarChange = () => {
    setLoading(false)
  }

  const handleDelete = () => {
    setOpenDeleteDialog(true)
  }

  const handleConfirmDelete = async () => {
    try {
      setOpenDeleteDialog(false)

      const status = await UserService.deleteUsers([user._id])

      if (status === 200) {
        navigate('/users')
      } else {
        Helper.error()
        setLoading(false)
      }
    } catch (err) {
      Helper.error(err)
    }
  }

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false)
  }

  const onLoad = async (loggedUser) => {
    if (loggedUser && loggedUser.verified) {
      setLoading(true)

      const params = new URLSearchParams(window.location.search)
      if (params.has('u')) {
        const id = params.get('u')
        if (id && id !== '') {
          try {
            const user = await UserService.getUser(id)

            if (user) {
              const setState = (companies) => {
                setCompanies(companies)
                setLoggedUser(loggedUser)
                setUser(user)
                setVisible(true)
                setLoading(false)
              }

              const admin = Helper.admin(loggedUser)
              if (admin) {
                const companies = await SupplierService.getAllCompanies()
                const companyIds = Helper.flattenCompanies(companies)
                setState(companyIds)
              } else {
                setState([loggedUser._id])
              }
            } else {
              setLoading(false)
              setNoMatch(true)
            }
          } catch (err) {
            Helper.error(err)
            setLoading(false)
            setVisible(false)
          }
        } else {
          setLoading(false)
          setNoMatch(true)
        }
      } else {
        setLoading(false)
        setNoMatch(true)
      }
    }
  }

  const edit =
    loggedUser && user && (loggedUser.type === Env.RECORD_TYPE.ADMIN || loggedUser._id === user._id || (loggedUser.type === Env.RECORD_TYPE.COMPANY && loggedUser._id === user.company))
  const company = user && user.type === Env.RECORD_TYPE.COMPANY

  return (
    <Master onLoad={onLoad} strict={true}>
      {loggedUser && user && visible && (
        <div className="user">
          <div className="col-1">
            <section className="user-avatar-sec">
              <Avatar
                record={user}
                type={user.type}
                mode="update"
                size="large"
                hideDelete
                onBeforeUpload={onBeforeUpload}
                onChange={onAvatarChange}
                color="disabled"
                className={company ? 'company-avatar' : 'user-avatar'}
                readonly
                verified
              />
            </section>
            <Typography variant="h4" className="user-name">
              {user.fullName}
            </Typography>
            {user.bio && (
              <Typography variant="h6" className="user-info">
                {user.bio}
              </Typography>
            )}
            {user.location && (
              <Typography variant="h6" className="user-info">
                {user.location}
              </Typography>
            )}
            {user.phone && (
              <Typography variant="h6" className="user-info">
                {user.phone}
              </Typography>
            )}
            <div className="user-actions">
              {edit && (
                <Tooltip title={commonStrings.UPDATE}>
                  <IconButton href={`/update-user?u=${user._id}`}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
              {edit && (
                <Tooltip title={commonStrings.DELETE}>
                  <IconButton data-id={user._id} onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </div>
          <div className="col-2">
            {(edit || !company) && (
              <BookingList
                containerClassName="user"
                offset={offset}
                loggedUser={loggedUser}
                user={company ? undefined : user}
                companies={company ? [user._id] : companies}
                statuses={statuses}
                hideDates={Env.isMobile()}
                checkboxSelection={!Env.isMobile()}
                hideCompanyColumn={company}
              />
            )}
          </div>
        </div>
      )}
      <Dialog disableEscapeKeyDown maxWidth="xs" open={openDeleteDialog}>
        <DialogTitle className="dialog-header">{commonStrings.CONFIRM_TITLE}</DialogTitle>
        <DialogContent>{ulStrings.DELETE_USER}</DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleCancelDelete} variant="contained" className="btn-secondary">
            {commonStrings.CANCEL}
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            {commonStrings.DELETE}
          </Button>
        </DialogActions>
      </Dialog>
      {loading && <Backdrop text={commonStrings.LOADING} />}
      {noMatch && <NoMatch hideHeader />}
    </Master>
  )
}

export default User
