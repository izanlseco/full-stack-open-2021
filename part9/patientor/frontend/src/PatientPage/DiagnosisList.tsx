import { Diagnosis } from '../types';
import { List } from 'semantic-ui-react';
import React from 'react';
import { useStateValue } from '../state';
import { v4 as uuid } from 'uuid';

const DiagnosisList = ({ diagnosisCodes }: { diagnosisCodes: Array<Diagnosis["code"]>}) => {
  const [{ diagnoses }] = useStateValue();


  return (
    <List>
      <List.Item>
        <List.Header>
          {diagnosisCodes.length > 1 ? "Diagnoses" : "Diagnosis"}
        </List.Header>
      </List.Item>
      {diagnosisCodes.map((code) => (
        <List.Item key={uuid()}>
          <List.Content>
            <List.Description>
              <strong>{code} -</strong>
              {diagnoses[code] && diagnoses[code].name}
            </List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default DiagnosisList;