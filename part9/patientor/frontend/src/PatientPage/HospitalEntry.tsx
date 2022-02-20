import { Card, Icon } from 'semantic-ui-react';

import DiagnosisList from './DiagnosisList';
import { Hospital } from '../types';
import React from 'react';

const HospitalEntry = ({ entry }: { entry: Hospital}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date} <Icon name='hospital symbol' /></Card.Header>
        <Card.Meta>{entry.specialist}</Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
        {entry.diagnosisCodes && (
          <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
        )}
      </Card.Content>
    </Card>
  );
};

export default HospitalEntry;