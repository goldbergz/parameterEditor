import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ParamEditor } from "./ParamEditor";
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

describe("ParamEditor", () => {
  test("отображает все поля из params", () => {
    render(<ParamEditor params={params} model={model} />);
    expect(screen.getByText("Назначение")).toBeInTheDocument();
    expect(screen.getByText("Длина")).toBeInTheDocument();
  });

  test("инициализируется значениями из model.paramValues", () => {
    render(<ParamEditor params={params} model={model} />);
    expect(screen.getByTestId("input-1")).toHaveValue("повседневное");
    expect(screen.getByTestId("input-2")).toHaveValue("макси");
  });

  test("getModel() возвращает обновлённые значения", () => {
    const ref = React.createRef<ParamEditor>();
    render(<ParamEditor ref={ref} params={params} model={model} />);

    fireEvent.change(screen.getByTestId("input-1"), {
      target: { value: "праздничное" },
    });

    const result = ref.current!.getModel();

    expect(result.paramValues).toEqual([
      { paramId: 1, value: "праздничное" },
      { paramId: 2, value: "макси" },
    ]);
  });
});
