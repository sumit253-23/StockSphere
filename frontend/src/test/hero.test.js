import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Hero from "../landing_pages/home/Hero";

describe("Hero Component", () => {
  test("renders Hero image", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    const heroImage = screen.getByAltText("StockSphere dashboard preview");

    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute("src", "/media/images/homeHero.png");
  });



   
  });



