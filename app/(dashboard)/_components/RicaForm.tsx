import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

const RicaForm = () => {
  return (
     <ScrollArea className="max-w-4xl mx-auto p-6 bg-white text-black h-[80vh]">
      
      

      {/* DATE */}
      <div className="flex justify-end mb-4">
        <label className="mr-2 font-semibold">Tariki:</label>
        <input type="date" className="border px-2 py-1" />
      </div>

      

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input placeholder="Amazina yose" className="border p-2" />
        <input placeholder="Inomero y’Indangamuntu" className="border p-2" />
        <input placeholder="Akarere" className="border p-2" />
        <input placeholder="Umurenge" className="border p-2" />
        <input placeholder="Akagari" className="border p-2" />
        <input placeholder="Umudugudu" className="border p-2" />
        <input placeholder="Inomero ya Telefone" className="border p-2 col-span-2" />
      </div>

      <p className="mb-6">witwa <strong>UGURISHA</strong> muri aya masezerano;</p>

      {/* SECOND PARTY */}
      <h2 className="font-semibold mb-2">Na</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <p>Amazina yose:Baganineza Jean Bosco</p>
        <p>Inomero y’Indangamuntu: 1111......</p>

        
      </div>

      <p className="mb-6">witwa <strong>UMUGUZI</strong> muri aya masezerano;</p>

      {/* AGREEMENT TEXT */}
      

      {/* TABLE */}
      <h2 className="font-semibold mb-2">
        1. Dukozemo amasezerano y’ubugure bw’ibikoresho by’ikoranabuhanga
        bifite ibimenyetso bikurikira:
      </h2>

      <table className="w-full border border-collapse">
        <tbody>
          <tr>
            <td className="border p-2 w-1/3">1. Icyiciro</td>
            <td className="border p-2">
              <input className="w-full p-1 border" />
            </td>
          </tr>
          <tr>
            <td className="border p-2">2. Izina ry’ikirango</td>
            <td className="border p-2">
              <input className="w-full p-1 border" />
            </td>
          </tr>
          <tr>
            <td className="border p-2">3. Izina ndangagikoresho cyo mu ruganda</td>
            <td className="border p-2">
              <input className="w-full p-1 border" />
            </td>
          </tr>
          <tr>
            <td className="border p-2">4. Inomero y’ubwoko</td>
            <td className="border p-2">
              <input className="w-full p-1 border" />
            </td>
          </tr>
          <tr>
            <td className="border p-2">5. Inomero ya seri</td>
            <td className="border p-2">
              <input className="w-full p-1 border" />
            </td>
          </tr>
          <tr>
            <td className="border p-2">
              6. Amakuru agenewe International / Mobile
            </td>
            <td className="border p-2">
              <input className="w-full p-1 border" />
            </td>
          </tr>
          <tr>
            <td className="border p-2">
              7. Ibisobanuro by'imikorere n'imikoreshereze y'igikoresho
            </td>
            <td className="border p-2">
              <input className="w-full p-1 border" />
            </td>
          </tr>
          <tr>
            <td className="border p-2">
              8. Ikiguzi cy'igikoresho:
            </td>
            <td className="border p-2">
              <input className="w-full p-1 border" />
            </td>
          </tr>
        </tbody>
      </table>

    </ScrollArea>
  )
}

export default RicaForm