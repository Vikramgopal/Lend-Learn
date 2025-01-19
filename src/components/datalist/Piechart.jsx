import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

const Piechart = ({ booksList, transactionsList }) => {
  // Compute genre counts
  const genreCounts = transactionsList.reduce((acc, transaction) => {
    const book = booksList.find((b) => b.bookId === transaction.bookId);
    if (book) {
      if (transaction.status === "Issued") {
        acc[book.genre] = (acc[book.genre] || 0) + 1;
      }
    }
    return acc;
  }, {});

  // Filter out genres with a count of 0
  const filteredGenreCounts = Object.entries(genreCounts).reduce(
    (acc, [genre, count]) => {
      if (count > 0) acc[genre] = count;
      return acc;
    },
    {}
  );

  // Predefined color palette (25 colors)
  const predefinedColors = [
    "#FF6384", // Red
    "#36A2EB", // Blue
    "#FFCE56", // Yellow
    "#4BC0C0", // Cyan
    "#9966FF", // Purple
    "#F7464A", // Scarlet
    "#46BFBD", // Light teal
    "#FDB45C", // Orange
    "#949FB1", // Grey
    "#4D5360", // Dark grey
    "#AC64AD", // Lavender
    "#66CC99", // Mint green
    "#FF9F40", // Orange-red
    "#FFCD56", // Gold
    "#2B8EAD", // Turquoise
    "#76A346", // Olive green
    "#F76363", // Salmon
    "#9D9D9D", // Light grey
    "#FF6F61", // Coral
    "#A779E9", // Lilac
    "#5A9BD4", // Sky blue
    "#FFCC33", // Amber
    "#34A853", // Green
    "#EA4335", // Red-orange
    "#FF8C00", // Dark orange
  ];

  // Add dynamic colors if more genres exist
  const dynamicColors = [...predefinedColors];
  while (dynamicColors.length < Object.keys(filteredGenreCounts).length) {
    const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
    dynamicColors.push(randomColor);
  }

  // Prepare data for the chart
  const data = {
    labels: Object.keys(filteredGenreCounts),
    datasets: [
      {
        data: Object.values(filteredGenreCounts),
        backgroundColor: dynamicColors,
        hoverBackgroundColor: dynamicColors.map((color) =>
          color.replace("50%", "60%")
        ),
        borderWidth: 2,
        borderColor: "#1f2937",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disable default legend
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#f3f4f6",
        bodyColor: "#f3f4f6",
      },
    },
  };

  return (
    <main className="flex flex-col bg-black bg-opacity-40 rounded-md text-white h-full w-full">
      {/* Heading Section */}
      <section className="h-[8vh] flex justify-center items-center bg-opacity-70 bg-black font-merriweather rounded-t-md uppercase tracking-widest px-4">
        Books Issued by Genre
      </section>

      {/* Pie Chart Section */}
      <section className="h-[80vh] font-montserrat grid grid-cols-2 max-md:grid-cols-1  overflow-y-scroll max-md:py-5  scrollbar-hide gap-4 px-6 items-center">
        {/* Left: Pie Chart */}
        <div className="flex justify-center items-center bg-black bg-opacity-70 max-sm:h-[50vh]   h-[70vh] p-8 rounded-md shadow-lg">
          {Object.keys(filteredGenreCounts).length > 0 ? (
            <Pie data={data} options={options} />
          ) : (
            <p className="text-gray-300  font-sans text-xl text-center">
              No data available for the pie chart.
            </p>
          )}
        </div>

        {/* Right: Legend */}
        <div className="flex flex-col justify-start items-start overflow-y-scroll scrollbar-hide bg-black bg-opacity-70 h-[70vh] p-6 rounded-md shadow-lg">
          <h3 className="text-lg uppercase font-merriweather  font-semibold mb-4">
            Legend
          </h3>
          <ul className="space-y-2 font-montserrat">
            {Object.entries(filteredGenreCounts).map(([genre], index) => (
              <li key={genre} className="flex items-center space-x-3">
                <span
                  className="inline-block w-4 h-4 rounded-full"
                  style={{ backgroundColor: dynamicColors[index] }}
                ></span>
                <span className="text-sm">{genre}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Piechart;
