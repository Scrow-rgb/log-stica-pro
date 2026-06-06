/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  CheckCircle, 
  Plus, 
  ChevronRight,
  Filter,
  Play,
  RotateCw,
  AlertTriangle,
  XCircle,
  Truck,
  Activity,
  UserCheck,
  Send,
  Navigation
} from 'lucide-react';
import { DeliveryItem, DeliveryStatus } from '../types';

interface DashboardViewProps {
  companyName: string;
  fleetSize: number;
  onCreateNewRoute: () => void;
  onNavigateTo: (screen: string) => void;
  deliveries: DeliveryItem[];
  setDeliveries: React.Dispatch<React.SetStateAction<DeliveryItem[]>>;
  addToast: (message: string, type: 'success' | 'info' | 'error') => void;
}

export default function DashboardView({ 
  companyName, 
  fleetSize, 
  onCreateNewRoute, 
  onNavigateTo,
  deliveries,
  setDeliveries,
  addToast
}: DashboardViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(14);

  // Stats calculation
  const totalRoutes = 38;
  const completedCount = useMemo(() => deliveries.filter(d => d.status === 'Entregue').length, [deliveries]);
  const activeCount = useMemo(() => deliveries.filter(d => d.status === 'Em rota').length, [deliveries]);
  const failedCount = useMemo(() => deliveries.filter(d => d.status === 'Falhou').length, [deliveries]);

  // Filtered deliveries
  const filteredDeliveries = useMemo(() => {
    return deliveries.filter(d => {
      const matchSearch = 
        d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchStatus = statusFilter === 'All' || d.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [deliveries, searchTerm, statusFilter]);

  // Handle click on row
  const handleSelectDelivery = (id: string) => {
    setSelectedDeliveryId(id === selectedDeliveryId ? null : id);
  };

  // Simulates status increment or changes
  const handleSimulateStep = (id: string, newStatus: DeliveryStatus) => {
    setDeliveries(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          status: newStatus,
          updatedAt: 'Agora mesmo'
        };
      }
      return d;
    }));
    
    addToast(`status do pedido ${id} atualizado para ${newStatus}`, 'success');
  };

  // Quick helper to dispatch a temporary new delivery
  const handleQuickAddDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const client = (form.elements.namedItem('disp_client') as HTMLInputElement).value;
    const address = (form.elements.namedItem('disp_address') as HTMLInputElement).value;
    const cep = (form.elements.namedItem('disp_cep') as HTMLInputElement).value;

    if (!client || !address) {
      addToast('Preencha os campos obrigatórios!', 'error');
      return;
    }

    const randomId = `#LP-${Math.floor(10000 + Math.random() * 90000)}`;
    const newDeliv: DeliveryItem = {
      id: randomId,
      client,
      address,
      cep: cep || '01000-000',
      status: 'Em rota',
      updatedAt: 'Há 1 min',
      coordinates: {
        x: 30 + Math.random() * 40,
        y: 25 + Math.random() * 50
      }
    };

    setDeliveries(prev => [newDeliv, ...prev]);
    addToast(`Nova entrega ${randomId} despachada com sucesso!`, 'success');
    form.reset();
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 font-sans">
      {/* Top Welcome Panel with Action Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0b1c30] tracking-tight">
            Olá, {companyName}
          </h1>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
            Operação Sudeste • Frota monitorada: 142 veículos
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Buscar pedidos, rotas ou motoristas..."
            value={searchTerm}
            id="search_deliveries_input"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs placeholder-gray-400 text-gray-950 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all font-medium"
          />
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* KPI Overviews Row - Screen 3 design with left colored borders */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* KPI Card 1: Rotas Ativas */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 relative overflow-hidden shadow-sm flex flex-col justify-between ui-card-lift-subtle ui-border-hover">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-blue-600"></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rotas Ativas</p>
            <h3 className="text-2xl font-black text-[#0b1c30] mt-1.5">{totalRoutes}</h3>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <span className="flex items-center gap-0.5 bg-blue-50 text-blue-600 font-bold text-[10px] px-1.5 py-0.5 rounded-md">
              <TrendingUp className="h-3 w-3" /> +12%
            </span>
            <span className="text-[10px] text-gray-400 font-semibold">Vs. ontem</span>
          </div>
        </div>

        {/* KPI Card 2: Entregas Concluídas */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 relative overflow-hidden shadow-sm flex flex-col justify-between ui-card-lift-subtle ui-border-hover">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-emerald-600"></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Entregas Concluídas</p>
            <h3 className="text-2xl font-black text-[#0b1c30] mt-1.5">{847 + completedCount}</h3>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <span className="flex items-center gap-0.5 bg-emerald-50 text-emerald-600 font-bold text-[10px] px-1.5 py-0.5 rounded-md">
              <TrendingUp className="h-3 w-3" /> +8%
            </span>
            <span className="text-[10px] text-gray-400 font-semibold">Meta: 920/dia</span>
          </div>
        </div>

        {/* KPI Card 3: Tempo de Viagem */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 relative overflow-hidden shadow-sm flex flex-col justify-between ui-card-lift-subtle ui-border-hover">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-amber-500"></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tempo Médio de Entrega</p>
            <h3 className="text-2xl font-black text-[#0b1c30] mt-1.5">24h</h3>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <span className="flex items-center gap-0.5 bg-amber-50 text-amber-600 font-bold text-[10px] px-1.5 py-0.5 rounded-md">
              <TrendingDown className="h-3 w-3" /> -6%
            </span>
            <span className="text-[10px] text-gray-400 font-semibold">Região metropolitana SP</span>
          </div>
        </div>

        {/* KPI Card 4: Custo de Frete por Entrega */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 relative overflow-hidden shadow-sm flex flex-col justify-between ui-card-lift-subtle ui-border-hover">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-blue-500"></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Frota Monitorada</p>
            <h3 className="text-2xl font-black text-[#0b1c30] mt-1.5">142</h3>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <span className="flex items-center gap-0.5 bg-emerald-50 text-emerald-600 font-bold text-[10px] px-1.5 py-0.5 rounded-md">
              <TrendingUp className="h-3 w-3" /> +3%
            </span>
            <span className="text-[10px] text-gray-400 font-semibold">Veículos ativos hoje</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map (left) + Simulator dispatcher (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Interactive Map of São Paulo (Spans 2 cols) */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between h-[400px] relative group ui-border-hover">
          {/* Map Top Metadata Ribbon */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 pointer-events-none">
            <div className="bg-white/95 backdrop-blur-sm border border-gray-200 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm text-[10px] font-bold text-gray-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>São Paulo, SP</span>
            </div>

            <div className="bg-white/95 backdrop-blur-sm border border-gray-200 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm text-[10px] font-bold text-gray-800">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>{activeCount} Ativas</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>{failedCount} Alertas</span>
            </div>
          </div>

          {/* Interactive Graphic Map canvas/SVG background overlay */}
          <div className="flex-1 bg-sky-50 relative overflow-hidden cursor-grab active:cursor-grabbing select-none" style={{ backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-46.6333,-23.5505,11,0/600x400?access_token=none')`, backgroundSize: 'cover' }}>
            <div className="absolute inset-0 bg-slate-900/10 pointer-events-none"></div>

            {/* Simulated Street Grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0,50 L 500,120 M 0,250 L 600,280 M 300,0 L 250,400 M 120,0 L 200,400 M 0,380 L 600,100" stroke="#FFFFFF" strokeWidth="4" fill="none" />
              <path d="M 50,50 Q 150,150 400,150 T 600,350" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow)" fill="none" strokeDasharray="5" className="animate-[dash_10s_linear_infinite]" />
            </svg>

            {/* Custom Interactive Marker Pins dynamically plotted */}
            {filteredDeliveries.map((deliv) => {
              const isSelected = selectedDeliveryId === deliv.id;
              
              let pinColor = 'bg-blue-600 text-white';
              if (deliv.status === 'Entregue') pinColor = 'bg-emerald-600 text-white';
              if (deliv.status === 'Falhou') pinColor = 'bg-red-500 text-white';
              if (deliv.status === 'Atrasado') pinColor = 'bg-amber-500 text-white';

              return (
                <div 
                  key={deliv.id}
                  onClick={() => setSelectedDeliveryId(deliv.id)}
                  style={{ left: `${deliv.coordinates.x}%`, top: `${deliv.coordinates.y}%` }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all cursor-pointer ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                >
                  {/* Ripple Ring around active deliveries */}
                  {deliv.status === 'Em rota' && (
                    <span className="absolute -inset-2.5 rounded-full bg-blue-400/30 animate-ping absolute pointer-events-none"></span>
                  )}
                  
                  <div className={`p-1.5 rounded-full flex items-center justify-center shadow-lg ${pinColor}`}>
                    <Truck className="h-3 w-3" />
                  </div>
                  
                  {/* Floating Micro Tag */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[8px] font-bold whitespace-nowrap bg-black text-white shadow opacity-85 transition-opacity ${
                    isSelected ? 'opacity-100' : 'group-hover:opacity-100 sm:opacity-0'
                  }`}>
                    {deliv.id}
                  </div>
                </div>
              );
            })}

            {/* Float Label over Map Districts to match mockup aesthetics */}
            <div className="absolute top-24 left-1/4 pointer-events-none font-black text-[10px] text-gray-500 tracking-widest opacity-40 uppercase">Pinheiros</div>
            <div className="absolute bottom-28 right-1/4 pointer-events-none font-black text-[10px] text-gray-500 tracking-widest opacity-40 uppercase">Vila Mariana</div>
            <div className="absolute top-1/2 left-1/2 pointer-events-none font-black text-xs text-gray-600 tracking-widest opacity-50 uppercase">São Paulo Centro</div>

            {/* Map Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-20">
              <button 
                type="button"
                onClick={() => setMapZoom(prev => Math.min(prev + 1, 18))} 
                className="w-8 h-8 rounded-xl bg-white border border-gray-200 shadow-md flex items-center justify-center font-bold text-gray-700 hover:bg-gray-50 ui-btn hover:border-blue-200/80"
              >
                +
              </button>
              <button 
                type="button"
                onClick={() => setMapZoom(prev => Math.max(prev - 1, 10))} 
                className="w-8 h-8 rounded-xl bg-white border border-gray-200 shadow-md flex items-center justify-center font-bold text-gray-700 hover:bg-gray-50 ui-btn hover:border-blue-200/80"
              >
                -
              </button>
            </div>
          </div>
        </div>

        {/* Dispatch Simulator Controller (Spans 1 col) */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between ui-border-hover">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-blue-600 tracking-widest uppercase">DIRECIONAMENTO DE DRIVER</h3>
              <span className="bg-blue-50 text-blue-700 text-[9px] px-2 py-0.5 rounded-full font-bold">Modo Demo</span>
            </div>
            <p className="text-xs text-gray-500 leading-normal mb-4">Simule ações operacionais de última milha do entregador para ver o dashboard se atualizar em tempo real.</p>
            
            <AnimatePresence mode="wait">
              {selectedDeliveryId ? (
                (() => {
                  const targetItem = deliveries.find(d => d.id === selectedDeliveryId);
                  if (!targetItem) return null;
                  
                  return (
                    <motion.div 
                      key="selected_deliv"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl space-y-4"
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-blue-600">{targetItem.id}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                            targetItem.status === 'Entregue' ? 'bg-emerald-100 text-emerald-800' :
                            targetItem.status === 'Falhou' ? 'bg-red-100 text-red-800' :
                            targetItem.status === 'Atrasado' ? 'bg-amber-100 text-amber-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>{targetItem.status}</span>
                        </div>
                        <p className="text-xs font-bold text-gray-900 mt-1">{targetItem.client}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{targetItem.address}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <button 
                          type="button"
                          onClick={() => handleSimulateStep(targetItem.id, 'Entregue')}
                          className="px-2 py-1.5 bg-emerald-600 text-white text-[10px] font-bold rounded-lg hover:bg-emerald-700 ui-btn flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle className="h-3 w-3" /> Sucesso (OK)
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleSimulateStep(targetItem.id, 'Falhou')}
                          className="px-2 py-1.5 bg-red-600 text-white text-[10px] font-bold rounded-lg hover:bg-red-700 ui-btn flex items-center justify-center gap-1.5"
                        >
                          <XCircle className="h-3 w-3" /> Falhou (Recusa)
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleSimulateStep(targetItem.id, 'Atrasado')}
                          className="px-2 py-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-lg hover:bg-amber-600 ui-btn flex items-center justify-center gap-1.5"
                        >
                          <AlertTriangle className="h-3 w-3" /> Atrasado (Tráfego)
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleSimulateStep(targetItem.id, 'Em rota')}
                          className="px-2 py-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-lg hover:bg-blue-700 ui-btn flex items-center justify-center gap-1.5"
                        >
                          <RotateCw className="h-3 w-3" /> Reiniciar rota
                        </button>
                      </div>
                    </motion.div>
                  );
                })()
              ) : (
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-center">
                  <Activity className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                  <p className="text-[10px] font-bold text-gray-600">Nenhum veículo selecionado</p>
                  <p className="text-[10px] text-gray-400 mt-1">Selecione uma entrega na tabela ou pin no mapa para forçar ações de driver simulado.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Dispatch Action Form */}
          <form onSubmit={handleQuickAddDelivery} className="border-t border-gray-100 mt-4 pt-4 space-y-3">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Despacho de Urgência (Ad-Hoc)</h4>
            
            <div className="space-y-2">
              <input 
                name="disp_client"
                type="text" 
                placeholder="Cliente (Ex: Comercial Mendes Atacado)"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 text-[11px] rounded-lg text-gray-950 focus:ring-1 focus:ring-blue-600 font-medium"
                required
              />
              <input 
                name="disp_address"
                type="text" 
                placeholder="Endereço (Ex: Rua Vergueiro, 2253, Vila Mariana)"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 text-[11px] rounded-lg text-gray-950 focus:ring-1 focus:ring-blue-600 font-medium"
                required
              />
              <input 
                name="disp_cep"
                type="text" 
                placeholder="CEP (Ex: 04101-300)"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 text-[11px] rounded-lg text-gray-950 focus:ring-1 focus:ring-blue-600 font-medium"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#0b1c30] text-white py-2 rounded-lg font-bold text-[11px] hover:bg-gray-850 ui-btn flex items-center justify-center gap-1.5"
            >
              <Send className="h-3 w-3" /> Enviar Driver Direto
            </button>
          </form>
        </div>
      </div>

      {/* Monitoramento de Entregas Data Table block - Screen 3 design */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm ui-border-hover">
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-sm font-bold text-[#0b1c30]">Monitoramento de Entregas</h3>
            <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Últimas atualizações coordenadas em tempo real</p>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              id="dashboard_status_filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-xs rounded-xl text-gray-700 font-bold focus:ring-1 focus:ring-blue-600"
            >
              <option value="All">Filtro: Todos</option>
              <option value="Em rota">Em rota</option>
              <option value="Entregue">Entregue</option>
              <option value="Falhou">Falhou</option>
              <option value="Atrasado">Atrasado</option>
            </select>
            
            <button 
              type="button"
              onClick={() => { setSearchTerm(''); setStatusFilter('All'); setSelectedDeliveryId(null); }}
              className="px-3 py-1.5 border border-gray-200/80 text-xs rounded-xl font-bold text-gray-600 hover:bg-gray-50 ui-btn bg-white flex items-center gap-1.5 hover:border-gray-300/80"
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Data list rows responsive table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-400 font-bold tracking-wider uppercase border-b border-gray-100">
                <th className="py-3 px-5 text-[10px]">ID DO PEDIDO</th>
                <th className="py-3 px-5 text-[10px]">CLIENTE</th>
                <th className="py-3 px-5 text-[10px]">ENDEREÇO / CEP</th>
                <th className="py-3 px-5 text-[10px]">STATUS</th>
                <th className="py-3 px-5 text-[10px]">ÚLTIMA ATUALIZAÇÃO</th>
                <th className="py-3 px-5 text-right text-[10px]">AÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeliveries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400 font-medium">
                    Nenhuma entrega localizada com estes filtros.
                  </td>
                </tr>
              ) : (
                filteredDeliveries.map((deliv) => {
                  const isSelected = selectedDeliveryId === deliv.id;
                  
                  let statusBubble = 'bg-blue-50 text-blue-600';
                  if (deliv.status === 'Entregue') statusBubble = 'bg-emerald-50 text-emerald-600';
                  if (deliv.status === 'Falhou') statusBubble = 'bg-red-50 text-red-500';
                  if (deliv.status === 'Atrasado') statusBubble = 'bg-amber-50 text-amber-600';

                  return (
                    <tr 
                      key={deliv.id}
                      onClick={() => handleSelectDelivery(deliv.id)}
                      className={`border-b border-gray-100 hover:bg-gray-50/80 ui-card cursor-pointer ${
                        isSelected ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      <td className="py-4 px-5 font-mono text-[11px] text-gray-900 font-semibold">{deliv.id}</td>
                      <td className="py-4 px-5 font-bold text-[#0b1c30]">{deliv.client}</td>
                      <td className="py-4 px-5">
                        <div className="text-gray-900">{deliv.address}</div>
                        <div className="text-[10px] text-gray-400 font-mono mt-0.5">CEP: {deliv.cep}</div>
                      </td>
                      <td className="py-4 px-5">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusBubble}`}>
                          {deliv.status}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-gray-500 font-medium">{deliv.updatedAt}</td>
                      <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end gap-1.5">
                          {deliv.status === 'Em rota' && (
                            <button
                              type="button"
                              onClick={() => handleSimulateStep(deliv.id, 'Entregue')}
                              className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[10px] font-bold ui-btn"
                            >
                              Entregar
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setSelectedDeliveryId(deliv.id)}
                            className="p-1 text-gray-400 hover:text-blue-600 ui-btn"
                            title="Ver no painel lateral"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
