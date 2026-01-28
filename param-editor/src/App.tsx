import { useRef } from "react";
import { ParamEditor, ParamEditor as ParamEditorType } from "./ParamEditor";
import type { Param, Model } from "./ParamEditor";


const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
  colors: [],
};

export default function App() {
  const ref = useRef<ParamEditorType>(null);

  return (
    <div style={{ padding: 20 }}>
      <h2>Редактор параметров</h2>
      <ParamEditor ref={ref} params={params} model={model} />

      <button
        onClick={() => {
          console.log(ref.current?.getModel());
          alert("Model в консоли");
        }}
      >
        Получить Model
      </button>
    </div>
  );
}
