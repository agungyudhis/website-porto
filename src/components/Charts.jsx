export default function generateChart(data) {
    return {
        tooltip: {},
        dataset: {
            source: data.sort((a, b) => a.count - b.count),
        },
        grid: {
            left: "10%",
            right: "20%",
            top: "10%",
            bottom: "10%",
            containLabel: true,
        },
        xAxis: { name: "# Projects" },
        yAxis: { type: "category" },
        series: [
            {
                type: "bar",
                encode: {
                    x: "count",
                    y: "tool",
                },
                colorBy: "data",
            },
        ],
        color: data
            .sort((a, b) => a.count - b.count)
            .map((value) => value.color),
    }
}
