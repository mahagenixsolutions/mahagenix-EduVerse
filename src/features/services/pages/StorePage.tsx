import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreModule } from '../components/StoreModule';

export const StorePage: React.FC = () => {
  const navigate = useNavigate();
  return <StoreModule onBack={() => navigate('/services')} />;
};
