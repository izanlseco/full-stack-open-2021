import { Card, Icon } from 'semantic-ui-react';

import DiagnosisList from './DiagnosisList';
import { HealthCheck } from '../types';
import HealthRatingBar from '../components/HealthRatingBar';
import React from 'react';

const HealthCheckEntry = ({ entry }: { entry: HealthCheck}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date} <Icon name='stethoscope' /></Card.Header>
        <Card.Meta>{entry.specialist}</Card.Meta>
        <Card.Description>{entry.description}</Card.Description>
        {entry.diagnosisCodes && (
          <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
        )}
      </Card.Content>
      <Card.Content extra>
        <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
      </Card.Content>
    </Card>
  );
};

export default HealthCheckEntry;