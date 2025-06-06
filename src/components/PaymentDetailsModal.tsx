import React, { useState } from 'react';
import Modal from './Modal';
import PaymentDetails from './PaymentDetails';
import PaymentsSection from './PaymentsSection';
import InvoicesSection from './InvoicesSection';
import BookingsSection from './BookingsSection';
import FacturaDetails from './FacturaDetails';

interface PaymentDeatailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation:any;
}

type TabType = 'details' | 'payments' | 'invoices';

export const PaymentDeatailsModal: React.FC<PaymentDeatailsModalProps> = ({ 
  isOpen, 
  onClose, 
  reservation 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('details');

  if (!reservation) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Pago`}
      size="xl"
    >
      <div className="space-y-6">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-4">
            <button
              onClick={() => setActiveTab('details')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'details'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Detalles del Pago
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'payments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reservas
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'invoices'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Facturas
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === 'details' && <PaymentDetails reservation={reservation} />}
          {activeTab === 'payments' && (
            <BookingsSection 
              payments={reservation.solicitud} 
              currency={"MXN"} 
              totalAmount={reservation.total} 
            />
          )}
          {activeTab === 'invoices' && <InvoicesSection invoices={reservation.facturas} />}
        </div>
      </div>
    </Modal>
  );
};

export const FacturaDetailsModal: React.FC<PaymentDeatailsModalProps> = ({ 
  isOpen, 
  onClose, 
  reservation 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('details');

  if (!reservation) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Factura: ${reservation.id_facturama}`}
      size="xl"
    >
      <div className="space-y-6">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-4">
            <button
              onClick={() => setActiveTab('details')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'details'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Detalles de Factura
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'payments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reservas
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'invoices'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pagos
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === 'details' && <FacturaDetails reservation={reservation} />}
          {activeTab === 'payments' && (
            <BookingsSection 
              payments={reservation.solicitudes} 
              currency={"MXN"} 
              totalAmount={reservation.total_factura} 
            />
          )}
          {activeTab === 'invoices' && <PaymentsSection payments={reservation.pagos} currency='MXN' totalAmount={reservation.total_factura} />}
        </div>
      </div>
    </Modal>
  );
};