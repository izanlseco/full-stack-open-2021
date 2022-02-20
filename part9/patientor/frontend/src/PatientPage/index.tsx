import { Button, Container, Icon } from 'semantic-ui-react';
import { Diagnosis, ParamTypes, Patient } from '../types';
import React, { useEffect, useState } from 'react';
import { addEntry, setCurrentPatient, setDiagnosisList, useStateValue } from '../state';

import AddEntryModal from '../AddEntryModal';
import EntryDetails from './EntryDetails';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PatientInfoPage = () => {
  const id = useParams<ParamTypes>().id;
  const [{ patient, diagnoses }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = () : void => setModalOpen(true);

  const closeModal = () : void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    if (patient.id !== id) {
      void fetchPatientById();
    }
    if (Object.values(diagnoses).length === 0) {
      const fetchAllDiagnosis = async () => {
        
        const { data: diagnosisList } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses/`);
        dispatch(setDiagnosisList(diagnosisList));
      };
      void fetchAllDiagnosis();
     }
  }, [id, dispatch]);

  const fetchPatientById = async () => {
      const { data: patientFound } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(setCurrentPatient(patientFound));
  };
  void fetchPatientById();

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: patientWithNewEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(patientWithNewEntry));
      void fetchPatientById();
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown Error');
    }
  };
  
  return (
    <div>
      <Container>
        <h3>{patient.name} <Icon name={patient.gender === "male" ? "man" : "woman"} /></h3>
        <p>
          ssn: {patient.ssn} <br />
          occupation: {patient.occupation} <br />
        </p>
        <h4>Entries</h4>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button
          type="button"
          style={{marginBottom: "1em"}}
          onClick={() => openModal()}
        >
          Add entry
        </Button>
        {patient.entries ? patient.entries.map(e => (
          <div key={e.id}>
            <EntryDetails entry={e}/>
          </div>
        )): null}
      </Container>
    </div>
  );
};

export default PatientInfoPage;