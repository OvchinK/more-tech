import React from "react";
import * as d3 from "d3";

export class Graph extends React.Component {
    tree(data, width) {
        const root = d3.hierarchy(data);
        root.dx = 10;
        root.dy = width / (root.height + 1);
        return d3.tree().nodeSize([root.dx, root.dy])(root);
    }

    RenderGraph(data, width = 1920) {
        const root = this.tree(data, width);

        let x0 = Infinity;
        let x1 = -x0;
        root.each((d) => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });

        const svg = d3.select("#graph");

        const g = svg
            .append("g")
            .attr("font-family", "monospace")
            .attr("font-size", 14)
            .attr("font-weight", 'bold')
            .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

        const link = g
            .append("g")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.9)
            .attr("stroke-width", 2)
            .selectAll("path")
            .data(root.links())
            .join("path")
            .attr("stroke", (d, i) => d3.interpolateRdBu(1 - d3.easeQuad(i / ((1 << 5) - 1))))
            .attr(
                "d",
                d3
                    .linkHorizontal()
                    .x((d) => d.y)
                    .y((d) => d.x)
            );

        const node = g
            .append("g")
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .selectAll("g")
            .data(root.descendants())
            .join("g")
            .attr("transform", (d) => `translate(${d.y},${d.x})`);

        node.append("circle")
            .attr("fill", (d) => (d.children ? "#555" : "#999"))
            .attr("r", 2.5);

        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", (d) => (d.children ? -6 : 6))
            .attr("text-anchor", (d) => (d.children ? "end" : "start"))
            .text((d) => d.data.name)
            .clone(true)
            .lower()
            .attr("stroke", "white");
        return svg.node();
    }

    constructor(props: any) {
        super(props);
    }

    componentDidUpdate() {
        d3.select("#graph").selectAll("*").remove();
        this.RenderGraph(this.props.data);
    }

    render() {
        return (
            <div
                style={{
                    height: "70vh",
                    // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset',
                    background: 'rgba(24, 144, 255, 0.7)',
                    borderRadius: 20,
                    padding: "50px",
                }}
            >
                <svg id="graph" style={{height: "-webkit-fill-available", width: "100%", zIndex: 99999}}></svg>
            </div>
        );
    }
}
