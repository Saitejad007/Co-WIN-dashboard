// Write your code here
import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    lastSevenDaysData: [],
    vaccinationDataByAge: [],
    vaccinationDataByGender: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()

      const lastSevenDaysData = fetchedData.last_7_days_vaccination.map(
        data => ({
          firstDose: data.dose_1,
          secondDose: data.dose_2,
          vaccineDate: data.vaccine_date,
        }),
      )

      const vaccinationDataByAge = fetchedData.vaccination_by_age
      const vaccinationDataByGender = fetchedData.vaccination_by_gender
      this.setState({
        lastSevenDaysData,
        vaccinationDataByAge,
        vaccinationDataByGender,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="error-msg">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div testid="loader" className="loading-view">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderCowinPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderSuccessView = () => {
    const {
      lastSevenDaysData,
      vaccinationDataByGender,
      vaccinationDataByAge,
    } = this.state
    return (
      <>
        <VaccinationCoverage vaccinationDetails={lastSevenDaysData} />
        <VaccinationByGender
          vaccinationDataByGender={vaccinationDataByGender}
        />
        <VaccinationByAge vaccinationDataByAge={vaccinationDataByAge} />
      </>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              className="logo"
              alt="website logo"
            />
            <p className="website-title">Co-WIN</p>
          </div>
          <h1 className="heading">CoWIN Vaccination in India</h1>
          {this.renderCowinPage()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
