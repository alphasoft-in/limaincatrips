import React, { useState } from 'react';

interface BookingWidgetProps {
  tourTitle: string;
  phoneNumber?: string;
}

export default function BookingWidget({ tourTitle, phoneNumber = "51936976776" }: BookingWidgetProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');

  const handleBooking = () => {
    const formatDate = (dateStr: string) => {
      if (!dateStr) return '';
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    };

    let text = `Hola, quisiera información y reservar el tour: *${tourTitle}*.\n`;
    if (startDate) text += `\n📅 *Inicio:* ${formatDate(startDate)}`;
    if (endDate) text += `\n📅 *Fin:* ${formatDate(endDate)}`;
    text += `\n👥 *Adultos:* ${adults}`;
    if (children !== '0') text += `\n👧 *Niños:* ${children}`;
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };


  return (
    <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">¿Deseas reservar este tour?</h3>
      <p className="text-gray-600 mb-6 text-sm">Completa tus datos y contáctanos vía WhatsApp para confirmar disponibilidad.</p>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha de Inicio</label>
          <input 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha de Fin</label>
          <input 
            type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent text-gray-700"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Adultos</label>
            <div className="relative">
              <select 
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="w-full pl-3 pr-10 py-2 appearance-none border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent text-gray-700 bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
                <option value="Mas de 10">Más de 10</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Niños</label>
            <div className="relative">
              <select 
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                className="w-full pl-3 pr-10 py-2 appearance-none border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent text-gray-700 bg-white"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={handleBooking}
        className="block w-full bg-[#25D366] hover:bg-[#128C7E] text-white text-center font-bold py-3 px-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Reservar por WhatsApp
      </button>
    </div>
  );
}
