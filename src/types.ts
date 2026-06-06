/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CompanyConfig {
  name: string;
  segment: string;
  fleetSize: number;
}

export type OnboardingStep = 'Empresa' | 'Conexão' | 'Primeira Rota' | 'Sucesso';

export interface OnboardingState {
  currentStep: OnboardingStep;
  companyName: string;
  segment: string;
  fleetSize: number;
  integrationSelected: string;
  vtexStoreName?: string;
  firstRouteAdded: boolean;
}

export type DeliveryStatus = 'Em rota' | 'Entregue' | 'Falhou' | 'Atrasado';

export interface DeliveryItem {
  id: string; // e.g. #LP-49210
  client: string;
  address: string;
  cep: string;
  status: DeliveryStatus;
  updatedAt: string;
  coordinates: { x: number; y: number }; // Relative percentage coordinates for map plotting
}

export interface RouteStop {
  id: string;
  type: 'origin' | 'stop' | 'destination';
  name: string;
  address: string;
  coordinates: { x: number; y: number };
}

export interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  accentColor: string;
}

export interface IntegrationCard {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  type: 'VTEX' | 'Shopify' | 'Nuvemshop' | 'Custom';
  status: 'Conectado' | 'Disponível' | 'Customizado';
}
