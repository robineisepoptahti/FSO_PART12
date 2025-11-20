import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Todo from "../Todos/Todo";

describe("Todo component", () => {
  const mockTodo = {
    _id: "123235",
    text: "Hello cruel world",
    done: false,
  };

  it("renders todo text", () => {
    render(
      <Todo todo={mockTodo} deleteTodo={() => {}} completeTodo={() => {}} />
    );
    expect(screen.getByText("Hello cruel world")).toBeInTheDocument();
  });
});
