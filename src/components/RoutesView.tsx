/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Zap, 
  MapPin, 
  Navigation, 
  Sparkles, 
  Truck, 
  Check, 
  HelpCircle,
  Clock,
  Compass,
  ChevronsUpDown,
  TrendingDown,
  RotateCw
} from 'lucide-react';
import { RouteStop } from '../types';

interface RoutesViewProps {
  companyName: string;
  addToast: (message: string, type: 'success' | 'info' | 'error') => void;
}

export default function RoutesView({ companyName, addToast }: RoutesViewProps) {
  const [driver, setDriver] = useState<string>('João Silva (Moto SP-042)');
  const [optimizing, setOptimizing] = useState<boolean>(false);
  const [isOptimized, setIsOptimized] = useState<boolean>(false);
  const [mapMode, setMapMode] = useState<'otimizado' | 'transito'>('otimizado');
  
  // Custom Stops List styled exactly like Screen 4
  const [stops, setStops] = useState<RouteStop[]>([
    { id: 'start', type: 'origin', name: 'CD TransMendes — Vila Leopoldina', address: 'Av. Dr. Gastão Vidigal, 1946, São Paulo - SP', coordinates: { x: 30, y: 35 } },
    { id: 's1', type: 'stop', name: 'Drogaria Saúde Total — Consolação', address: 'Rua da Consolação, 2302, Consolação, São Paulo - SP', coordinates: { x: 50, y: 55 } },
    { id: 's2', type: 'stop', name: 'Papelaria Central do Estudante', address: 'Av. Paulista, 1578, Bela Vista, São Paulo - SP', coordinates: { x: 65, y: 45 } },
    { id: 's3', type: 'stop', name: 'Mercado Bom Preço — Jardins', address: 'Rua Oscar Freire, 800, Jardins, São Paulo - SP', coordinates: { x: 80, y: 65 } },
    { id: 'end', type: 'destination', name: 'Retorno ao CD — Vila Leopoldina', address: 'Av. Dr. Gastão Vidigal, 1946, São Paulo - SP', coordinates: { x: 55, y: 25 } }
  ]);

  const [newStopName, setNewStopName] = useState<string>('');
  const [newStopAddress, setNewStopAddress] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Distances before and after
  const distanceKm = isOptimized ? '10.2 km' : '15.4 km';
  const estimateTime = isOptimized ? '34 min' : '45 min';

  // Handle addition of stop
  const handleAddStop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStopName.trim() || !newStopAddress.trim()) {
      addToast('Por favor, preencha o nome e o endereço da parada', 'error');
      return;
    }

    const uniqueId = `stop_${Date.now()}`;
    const newStop: RouteStop = {
      id: uniqueId,
      type: 'stop',
      name: newStopName,
      address: newStopAddress,
      coordinates: {
        x: 40 + Math.random() * 35,
        y: 35 + Math.random() * 35
      }
    };

    // Insert stops right before the destination node
    const updated = [...stops];
    updated.splice(updated.length - 1, 0, newStop);
    setStops(updated);
    addToast('Parada adicionada à rota. Lembre-se de re-otimizar!', 'info');

    // Reset Form
    setNewStopName('');
    setNewStopAddress('');
    setShowAddForm(false);
    setIsOptimized(false);
  };

  // Handle remove of stop
  const handleRemoveStop = (id: string) => {
    if (id === 'start' || id === 'end') {
      addToast('Não é possível remover a origem ou destino final', 'error');
      return;
    }
    setStops(prev => prev.filter(s => s.id !== id));
    addToast('Parada excluída com sucesso', 'info');
    setIsOptimized(false);
  };

  // Trigger the Roteirização Optimization sequences
  const handleOptimizeRoute = () => {
    setOptimizing(true);
    addToast('Roteirizador de IA calculando o menor tempo físico...', 'info');

    setTimeout(() => {
      // geographical sorting simulation - keep 'start' and 'end' locked, but shuffle stops based on optimal coordinates
      const intermediateStops = stops.filter(s => s.type === 'stop');
      
      // Sort statically for demonstration to represent a deterministic optimization
      const sortedIntermediate = [...intermediateStops].sort((a, b) => {
        return a.coordinates.x - b.coordinates.x;
      });

      const finalStops = [
        stops[0], // Start
        ...sortedIntermediate,
        stops[stops.length - 1] // End
      ];

      setStops(finalStops);
      setOptimizing(false);
      setIsOptimized(true);
      addToast('Rota otimizada! Redução de 5.2km (33%) em emissões e combustível.', 'success');
    }, 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 font-sans">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0b1c30] tracking-tight">Otimizador de Rotas</h1>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-0.5">PLANEJADOR AUTOMÁTICO DE ENTREGAS</p>
        </div>
      </div>

      {/* Primary Metrics Row - Screen 4 Header style */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 flex flex-wrap justify-between items-center gap-6 shadow-sm ui-border-hover ui-card-lift-subtle">
        <div className="flex items-center gap-8 flex-wrap">
          <div>
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Distância Total</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-gray-900">{distanceKm}</span>
              {isOptimized && <span className="text-[10px] text-emerald-600 font-extrabold">(-5.2km)</span>}
            </div>
          </div>
          <div className="border-l border-gray-200 pl-8 h-10 hidden sm:block"></div>
          <div>
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tempo Estimado</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-gray-900">{estimateTime}</span>
              {isOptimized && <span className="text-[10px] text-emerald-600 font-extrabold">(-11 min)</span>}
            </div>
          </div>
          <div className="border-l border-gray-200 pl-8 h-10 hidden sm:block"></div>
          <div>
            <label htmlFor="driver_select" className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Motorista Designado</label>
            <select 
              id="driver_select"
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
              className="py-1 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:ring-1 focus:ring-blue-600 focus:bg-white"
            >
              <option value="João Silva (Moto SP-042)">João Silva (Moto SP-042)</option>
              <option value="Pedro Souza (Van SP-018)">Pedro Souza (Van SP-018)</option>
              <option value="Marcos Lima (Fiorino SP-007)">Marcos Lima (Fiorino SP-007)</option>
              <option value="Silvia Santos (Moto SP-031)">Silvia Santos (Moto SP-031)</option>
            </select>
          </div>
        </div>

        <div>
          <button 
            type="button"
            id="btn_optimize_action"
            disabled={optimizing}
            onClick={handleOptimizeRoute}
            className={`px-5 py-3 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-2 shadow-md ui-btn border-none ${
              optimizing 
                ? 'bg-blue-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100 hover:shadow-lg hover:-translate-y-0.5'
            }`}
          >
            {optimizing ? (
              <>
                <RotateCw className="h-4 w-4 animate-spin" />
                <span>Roteirizando...</span>
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 text-amber-350 fill-white" />
                <span>Otimizar Rota</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Paradas Stops Planner List column (Spans 5 coordinates width) */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6 ui-border-hover">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Paradas ({stops.length})</h3>
              <p className="text-[10px] text-gray-400">Verifique os endereços georreferenciados</p>
            </div>
            
            <button 
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-xl flex items-center gap-1 ui-btn hover:border-blue-200/60 border border-transparent"
            >
              <Plus className="h-3.5 w-3.5" /> Adicionar
            </button>
          </div>

          {/* Add Stop Panel Form drawer inline */}
          <AnimatePresence>
            {showAddForm && (
              <motion.form 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleAddStop}
                className="bg-gray-50 p-4 border border-gray-200 rounded-2xl space-y-3 overflow-hidden text-xs font-semibold"
              >
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">CADASTRAR PARADA INTERMEDIÁRIA</h4>
                <div className="space-y-2">
                  <input 
                    type="text" 
                    placeholder="Nome da parada (Ex: Drogaria Saúde Total — Pinheiros)"
                    value={newStopName}
                    onChange={(e) => setNewStopName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 text-xs rounded-lg placeholder-gray-400 text-gray-950 focus:ring-1 focus:ring-blue-600 font-semibold"
                    required
                  />
                  <input 
                    type="text" 
                    placeholder="Endereço (Ex: Rua Teodoro Sampaio, 1443, Pinheiros, São Paulo - SP)"
                    value={newStopAddress}
                    onChange={(e) => setNewStopAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 text-xs rounded-lg placeholder-gray-400 text-gray-950 focus:ring-1 focus:ring-blue-600 font-semibold"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button 
                    type="button" 
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1.5 text-gray-500 hover:text-gray-900 font-bold"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 ui-btn"
                  >
                    Salvar
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Stop Cards layout stack */}
          <div className="space-y-4">
            {stops.map((stop, sIdx) => {
              const isStart = stop.type === 'origin';
              const isEnd = stop.type === 'destination';
              
              let markerNum = '';
              let markerBg = 'bg-blue-600';
              if (isStart) {
                markerNum = '🛫';
                markerBg = 'bg-sky-100 text-sm';
              } else if (isEnd) {
                markerNum = '🏁';
                markerBg = 'bg-red-50 text-sm';
              } else {
                markerNum = String(sIdx);
                markerBg = 'bg-blue-100 text-blue-600 font-black text-xs';
              }

              return (
                <div 
                  key={stop.id}
                  className={`p-3.5 border rounded-2xl flex items-start gap-4 ui-card relative group ${
                    isStart 
                      ? 'bg-blue-50/20 border-blue-200/60 hover:border-blue-300/80' 
                      : isEnd 
                      ? 'bg-red-50/10 border-red-100 hover:border-red-200/80'
                      : 'bg-white border-gray-200 hover:border-gray-300/80 ui-card-lift-subtle'
                  }`}
                >
                  {/* Leading stop identifier */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${markerBg}`}>
                    {markerNum}
                  </div>

                  {/* Stop detail */}
                  <div className="space-y-0.5 flex-1 pr-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                      {isStart ? 'PONTO DE ORIGEM' : isEnd ? 'DESTINO FINAL DE ROTAS' : `PARADA ${sIdx}`}
                    </p>
                    <h4 className="text-xs font-bold text-gray-900 mt-1">{stop.name}</h4>
                    <p className="text-[10px] text-gray-500 font-medium">{stop.address}</p>
                  </div>

                  {/* Actions buttons */}
                  {!isStart && !isEnd && (
                    <button 
                      type="button"
                      onClick={() => handleRemoveStop(stop.id)}
                      className="absolute right-3.5 top-3.5 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 ui-btn"
                      title="Excluir Parada"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Saving visual feedback stats overlay */}
          {isOptimized && (
            <div className="bg-emerald-50/80 border border-emerald-100 p-4 rounded-2xl space-y-2 text-emerald-800 text-xs">
              <div className="flex items-center gap-1.5 font-bold">
                <Sparkles className="h-4 w-4 text-emerald-600 animate-bounce" />
                <span>Roteiro Rígido Otimizado com sucesso!</span>
              </div>
              <p className="leading-tight text-emerald-600 font-semibold">Paradas reordenadas por menor atrito geográfico e tráfego da Marginal Pinheiros. Economia estimada: 11 minutos e R$ 4,10 em combustível por rota.</p>
            </div>
          )}
        </div>

        {/* Map visualization panel (Spans 7 coordinates width matching Screen 4) */}
        <div className="lg:col-span-7 bg-[#212c3f] border border-gray-800 rounded-3xl h-[620px] overflow-hidden flex flex-col justify-between relative shadow-inner">
          
          {/* Map floating toggles - Otimizada / Trânsito */}
          <div className="absolute top-4 left-4 z-20 bg-[#16202e]/90 backdrop-blur border border-gray-700 p-1 rounded-xl flex gap-1 pointer-events-auto">
            <button 
              type="button"
              onClick={() => setMapMode('otimizado')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider ui-btn ${
                mapMode === 'otimizado' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              OTIMIZADA
            </button>
            <button 
              type="button"
              onClick={() => setMapMode('transito')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider ui-btn ${
                mapMode === 'transito' 
                  ? 'bg-amber-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              TRÂNSITO AO VIVO
            </button>
          </div>

          <div className="absolute top-4 right-4 z-10 text-[9px] font-black text-gray-400 tracking-wider bg-black/60 px-2 py-1 rounded">
            PLANNER VISUAL CORE Map
          </div>

          {/* High Contrast Dark Custom Map canvas */}
          <div className="flex-1 bg-[#121c29] relative overflow-hidden select-none">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-slate-900/35 pointer-events-none"></div>

            {/* Custom SVG Drawing calculated lines based on stop coordinates */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                </marker>
              </defs>

              {/* Road background lines for high fidelity dark style */}
              <g stroke="#ffffff" strokeWidth="1" strokeOpacity="0.06">
                <line x1="0" y1="100" x2="800" y2="100" />
                <line x1="0" y1="300" x2="800" y2="300" />
                <line x1="0" y1="500" x2="800" y2="500" />
                <line x1="150" y1="0" x2="150" y2="700" />
                <line x1="450" y1="0" x2="450" y2="700" />
                <line x1="650" y1="0" x2="650" y2="700" />
                {/* Diagonal roads */}
                <line x1="50" y1="50" x2="700" y2="600" strokeWidth="1.5" strokeOpacity="0.08" />
                <line x1="0" y1="450" x2="850" y2="150" strokeWidth="1.5" strokeOpacity="0.08" />
              </g>

              {/* Active Optimized Path Line Drawing Connecting All Stops */}
              <path 
                d={stops.map((s, idx) => `${idx === 0 ? 'M' : 'L'} ${s.coordinates.x * 7} ${s.coordinates.y * 5.8}`).join(' ')} 
                stroke={mapMode === 'transito' ? '#f59e0b' : '#3b82f6'} 
                strokeWidth={isOptimized ? '4.5' : '3'} 
                fill="none" 
                strokeDasharray={isOptimized ? 'none' : '6 6'} 
                className="transition-all duration-700"
              />

              {/* Glowing animated bullet dots sliding along the optimized blue route path representing a van/bike */}
              {isOptimized && (
                <path 
                  d={stops.map((s, idx) => `${idx === 0 ? 'M' : 'L'} ${s.coordinates.x * 7} ${s.coordinates.y * 5.8}`).join(' ')} 
                  stroke="#FFFFFF" 
                  strokeWidth="5" 
                  strokeLinecap="round"
                  fill="none" 
                  strokeDasharray="20 400"
                  className="animate-[dash_8s_linear_infinite]"
                />
              )}
            </svg>

            {/* Dynamic Coordinates markers on Top of High-Tech dark map */}
            {stops.map((stop, sIdx) => {
              const isStart = stop.type === 'origin';
              const isEnd = stop.type === 'destination';
              
              let stopBg = 'bg-blue-600 text-white';
              let stopMarkerLabel = String(sIdx);
              if (isStart) {
                stopBg = 'bg-white border-2 border-blue-600 text-blue-600';
                stopMarkerLabel = 'S';
              } else if (isEnd) {
                stopBg = 'bg-red-500 text-white border-2 border-white';
                stopMarkerLabel = 'E';
              }

              return (
                <div 
                  key={stop.id}
                  style={{ left: `${stop.coordinates.x}%`, top: `${stop.coordinates.y}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-md ${stopBg}`}>
                    {stopMarkerLabel}
                  </div>
                  
                  {/* Map Label text overlay */}
                  <span className="mt-1 px-1.5 py-0.5 bg-slate-900/90 text-white text-[8px] font-semibold border border-gray-800 rounded whitespace-nowrap opacity-80 select-none">
                    {stop.name.split(',')[0]}
                  </span>
                </div>
              );
            })}

            {/* Zoom coordinates UI overlay */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-1 z-20">
              <button type="button" className="w-8 h-8 rounded bg-[#1c293a] text-white border border-gray-700 shadow flex items-center justify-center hover:bg-gray-800 font-bold ui-btn hover:border-gray-600/80">+</button>
              <button type="button" className="w-8 h-8 rounded bg-[#1c293a] text-white border border-gray-700 shadow flex items-center justify-center hover:bg-gray-800 font-bold ui-btn hover:border-gray-600/80">-</button>
            </div>
            
            {/* Dynamic Grid Scale Overlay bottom-left */}
            <div className="absolute bottom-4 left-4 z-10 flex flex-col text-[8px] font-mono text-gray-400 bg-slate-900/60 p-1.5 rounded">
              <span>MÚLTIPLOS VETORES DE TRÂNSITO SP</span>
              <span className="text-gray-500 mt-0.5">Escala: 1 : 50,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
