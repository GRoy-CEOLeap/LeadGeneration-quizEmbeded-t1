import React from 'react';
import { Package } from 'lucide-react';

interface EquipmentItem {
  image: string;
  title: string;
  description: string;
}

interface EquipmentPreviewProps {
  config: {
    title: string;
    items: EquipmentItem[];
  };
}

export const EquipmentPreview: React.FC<EquipmentPreviewProps> = ({ config }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Package className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {config.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {config.items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-white rounded-lg mb-6 flex items-center justify-center p-6">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Package className="w-24 h-24" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
