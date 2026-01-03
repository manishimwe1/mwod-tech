import React from "react";
import AddNewItemBtn from "../../_components/AddNewItemBtn";

function page() {
  return (
    <div className="flex flex-col items-center w-full p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Rica Forms</h1>
        <AddNewItemBtn title="Add rica-form" />
      </div>

      <div className="w-full">
        {/* TITLE */}
        <h1 className="text-center font-bold text-lg uppercase mb-6">
          AMASEZERANO NGERO Y’UBUGURE BW’IBIKORESHO BY’AMASHANYARAZI CYANGWA
          IBY’IKORANABUHANGA BYAKORESHEWE
        </h1>

        <div className="flex justify-end mb-4">
          <label className="mr-2 font-semibold">Tariki:</label>
          {new Date().toLocaleDateString()}
        </div>

        {/* FIRST PARTY */}
        <h2 className="font-semibold mb-2">Amasezerano hagati ya:</h2>
        <div className="flex flex-col">
          <p>
            Bosco ufite inumero y'y’Indangamuntu cyangwa
            pasiporo:............,inomero y' iyandikwa. ry'ubucuruzi
            .........,utuye mu Ntara ya,......, Akarere Ka
            ...............Umurenge wa ...... Umurenge wa ....... Akagari ka
            .........,Umudugudu wa ........ ufite inemero ya terefoni ........
          </p>

          <p>witwa UGURISHA muri aya masezerano</p>
          <p>na</p>

          <p>
            Baganineza Jean Bosco ufite inumero y’Indangamuntu cyangwa
            pasiporo:............,inomero y' iyandikwa. ry'ubucuruzi
            .........,utuye mu Ntara y' Iburasirazuba, Akarere Ka: Rwamagana
            ,Umurenge wa Muyumbo, Akagari ka Nyarukombe, Umudugudu wa Gakenyeri
            ufite inemero ya terefoni 0783805516
          </p>

          <p>witwa UMUGURISHA muri aya masezerano</p>
        </div>
        <p className="mb-4 text-sm">
          jywe nk' UMUGUZI nifuza kugura igikoresho cy'amashanyarazi/igikoresho
          cy'ikoranabuhanga cyakoreshejwe k'UGURISHA, kandi, NK'UGURISHA, nanjye
          nkaba nifuza kukigurisha ku MUGUZI,bityo twemeranyije ko: 1.Dukoze
          amasezerano y'ubugure bw' igikoresho cy' amashanyarazi/igikoresho
          cy'ikoranabuhanga gifite ibimenyetso bikurikira
        </p>
      </div>
      <div>
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
              <td className="border p-2">
                3. Izina ndangagikoresho cyo mu ruganda
              </td>
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
              <td className="border p-2">8. Ikiguzi cy'igikoresho:</td>
              <td className="border p-2">
                <input className="w-full p-1 border" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default page;
