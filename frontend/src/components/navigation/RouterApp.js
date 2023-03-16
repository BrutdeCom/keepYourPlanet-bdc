import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Components

import HomePage from '../HomePage'
import PrivacyPolicy from '../PrivacyPolicy'
import SignupForm from '../SignupForm'
import SigninForm from '../SigninForm'
import Profile from '../profile/Profile'
import EvaluationForm from '../evaluations/EvaluationForm'
import ItineraryForm from '../evaluations/ItineraryForm'
import EvaluationResult from '../evaluations/EvaluationResult'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorBoundaryComp from './ErrorBoundaryComp'
import AddVehicle from '../profile/AddVehicle'
import ResetPassword from '../profile/ResetPassword'
import ProtectedRoute from './ProtectedRoute'
import AdminPanel from '../navigation/AdminPanel'
import ProtectedAdminRoute from './ProtectedAdminRoute'
import VehicleRegistrationForm from '../profile/VehicleRegistrationForm'


const RouterApp = () => {

  const myErrorHandler = (error) => {
    return (
      <div>{error}</div>
    )
  }

  return (
    <Switch>
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryComp}
        onError={myErrorHandler}>
        <Route path="/" exact component={HomePage} />
        <Route path="/politique-de-confidentialite" exact component={PrivacyPolicy} />
        <Route path="/inscription" exact component={SignupForm} />
        <Route path="/connexion" exact component={SigninForm} />
        <ProtectedAdminRoute path="/admin" exact component={AdminPanel} />
        <ProtectedRoute path="/mon-profil" component={Profile} />
        <ProtectedRoute path="/choix-itineraire" exact component={EvaluationForm} />
        <ProtectedRoute path="/itineraire" component={ItineraryForm} />
        <ProtectedRoute path="/evaluation" exact component={EvaluationResult} />
        <ProtectedRoute path="/ajout-vehicule" exact component={AddVehicle} />
        <ProtectedRoute path="/reset-password" exact component={ResetPassword} />
        <ProtectedRoute path="/registration-form" exact component={VehicleRegistrationForm} />
      </ErrorBoundary>
    </Switch>
  )
}

export default RouterApp
