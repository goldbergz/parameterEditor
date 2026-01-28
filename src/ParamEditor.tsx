import React from "react";

export interface Param {
  id: number;
  name: string;
  type: "string";
}

export interface ParamValue {
  paramId: number;
  value: string;
}

export interface Color {
  id: number;
  name: string;
}

export interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

export interface Props {
  params: Param[];
  model: Model;
}

interface State {
  values: Record<number, string>;
}

export class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const values: Record<number, string> = {};

    props.params.forEach((p) => {
      const existing = props.model.paramValues.find(
        (pv) => pv.paramId === p.id
      );
      values[p.id] = existing?.value ?? "";
    });

    this.state = { values };
  }

  private handleChange = (paramId: number, value: string) => {
    this.setState((prev) => ({
      values: { ...prev.values, [paramId]: value },
    }));
  };

  public getModel(): Model {
    const paramValues: ParamValue[] = Object.entries(this.state.values).map(
      ([paramId, value]) => ({
        paramId: Number(paramId),
        value,
      })
    );

    return {
      ...this.props.model,
      paramValues,
    };
  }

  private renderers: Record<
    Param["type"],
    (param: Param, value: string) => React.ReactNode
  > = {
    string: (param, value) => (
      <input
        data-testid={`input-${param.id}`}
        type="text"
        value={value}
        onChange={(e) => this.handleChange(param.id, e.target.value)}
      />
    ),
  };

  render() {
    const { params } = this.props;
    const { values } = this.state;

    return (
      <div>
        {params.map((param) => (
          <div key={param.id}>
            <label>{param.name}</label>
            {this.renderers[param.type](param, values[param.id] ?? "")}
          </div>
        ))}
      </div>
    );
  }
}
