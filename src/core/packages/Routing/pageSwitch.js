import React from 'react'
import { NOT_FOUND } from 'redux-first-router'
import { connect } from 'react-redux'

const PageSwitch = ({ locationSlug, slugToComponent, notFoundPage: NotFoundPage }) => {
  if (locationSlug === NOT_FOUND) return <NotFoundPage />
  const Page = slugToComponent[locationSlug]
  if (Page) return <Page />
  return null
}

export default (slugToComponent, notFoundPage) => {
  const mapStateToProps = (state) => ({
    locationSlug: state.location.type,
    slugToComponent,
    notFoundPage
  })
  const ConnectedPageSwitch = connect(mapStateToProps)(PageSwitch)

  return (WrappedComponent) => (props) => (
    <ConnectedPageSwitch>
      <WrappedComponent />
    </ConnectedPageSwitch>
  )
}
