"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

interface TechnicalDetailsProps {
  specs: {
    id: string;
    title: string;
    value: string;
    unit: string;
  }[];
  process: {
    id: string;
    step: number;
    title: string;
    description: string;
    image: string | null;
  }[];
  certifications: {
    id: string;
    type: string;
    description: string;
  }[];
}

export const TechnicalDetails = ({ specs, process, certifications }: TechnicalDetailsProps) => {
  return (
    <Tabs defaultValue="specs" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="specs">Especificaciones</TabsTrigger>
        <TabsTrigger value="process">Proceso</TabsTrigger>
        <TabsTrigger value="certifications">Certificaciones</TabsTrigger>
      </TabsList>
      
      <TabsContent value="specs" className="mt-6">
        <ScrollArea className="h-[400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specs.map((spec) => (
              <div key={spec.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold">{spec.title}</h3>
                <p className="text-gray-600">
                  {spec.value} {spec.unit}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="process" className="mt-6">
        <ScrollArea className="h-[400px]">
          <div className="space-y-8">
            {process.map((step) => (
              <div key={step.id} className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {step.image && (
                  <div className="relative aspect-video">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="certifications" className="mt-6">
        <ScrollArea className="h-[400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold">{cert.type}</h3>
                <p className="text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}; 