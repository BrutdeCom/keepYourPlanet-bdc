import React, { useContext, useState, useEffect } from 'react'
import MaterialTable from 'material-table'

import { AuthContext } from '../../Context/AuthContext'

const ResultsYearTable = () => {

  const authContext = useContext(AuthContext)
  const results = authContext.results

  const columns = [
    { title: 'Départ', field: 'itinerary.from' },
    { title: 'Arrivée', field: 'itinerary.to' },
    { title: 'Distance (Km)', field: 'itinerary.numberKm' },
    { title: 'Impact (kg/Co2)', field: 'impact' },
    { title: 'Date', field: 'dateEvaluation'}
  ]

  const [datas, setDatas] = useState([
    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
  ])

  useEffect(() => {
    try {
      results && setDatas(results)
    } catch (error) {
      throw error
    }
  }, [datas, results, setDatas])

  return (
    <>
      <MaterialTable
        title="Mes évaluations"
        columns={columns}
        data={datas}
        localization={{
          pagination: {
            labelRowsSelect: 'Lignes',
            firstTooltip: 'Première page',
            previousTooltip: 'Page précédente',
            nextTooltip: 'Page suivante',
            lastTooltip: 'Dernière page'
          },
          toolbar: {
            searchTooltip: 'Rechercher',
            searchPlaceholder: 'Rechercher'
          }
        }}
        options={{
          headerStyle: {
            backgroundColor: '#35a373',
            color: '#FFF'
          }
        }}
      />
    </>
  )
}

export default ResultsYearTable