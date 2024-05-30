// app/listings/[uuid]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { getListingByUUID } from "@/lib/api";
import Image from "next/image";
import { formatNumber } from "@/utils/formatNumber";
import { Listing } from "@/types";
import { useParams } from "next/navigation";
import { Line, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  TimeScale,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import "chartjs-adapter-date-fns";
import {
  ArrowUpFromLineIcon,
  ArrowDownFromLineIcon,
  Triangle,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const SingleListingPage = () => {
  const { uuid } = useParams();
  const [listing, setListing] = useState<Listing>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (uuid) {
      fetchListing(uuid as string);
    }
  }, [uuid]);

  const fetchListing = async (uuid: string) => {
    try {
      const data = await getListingByUUID(uuid);
      setListing(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching listing data:", err);
      setError("Failed to load listing data");
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!listing) {
    return <p>Loading...</p>;
  }

  const priceHistoryData = {
    labels: listing.price_history.map((entry: any) => entry.date),
    datasets: [
      {
        label: "Best Sell Price",
        data: listing.price_history.map((entry: any) => entry.best_sell_price),
        borderColor: "rgba(15, 27, 191, 1)",
        backgroundColor: "rgba(15, 27, 191, 0.2)",
        tension: 0.4,
        fill: false,
        pointBackgroundColor: "rgba(15, 27, 191, 1)",
        pointRadius: 5,
      },
      {
        label: "Best Buy Price",
        data: listing.price_history.map((entry: any) => entry.best_buy_price),
        borderColor: "rgba(240, 111, 12, 1)",
        backgroundColor: "rgba(240, 111, 12, 0.2)",
        tension: 0.4,
        fill: false,
        pointBackgroundColor: "rgba(240, 111, 12, 1)",
        pointRadius: 5,
      },
    ],
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: ignoring this line
  const Commentary = (priceHistory) => {
    if (priceHistory.length < 2) {
      return <p>Not enough data to provide commentary.</p>;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: ignoring this line
    const sellPrices = priceHistory.map((entry) => entry.best_sell_price);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: ignoring this line
    const buyPrices = priceHistory.map((entry) => entry.best_buy_price);
    const averageSellPrice =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: ignoring this line
      sellPrices.reduce((acc, price) => acc + price, 0) / sellPrices.length;

    const averageBuyPrice =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: ignoring this line
      buyPrices.reduce((acc, price) => acc + price, 0) / buyPrices.length;

    const recentSellPriceChange =
      ((sellPrices[0] - sellPrices[1]) / sellPrices[1]) * 100;
    const recentBuyPriceChange =
      ((buyPrices[0] - buyPrices[1]) / buyPrices[1]) * 100;

    const overallSellTrend = sellPrices[0] - sellPrices[sellPrices.length - 1];
    const overallBuyTrend = buyPrices[0] - buyPrices[buyPrices.length - 1];

    const startDate = new Date(priceHistory[0].date);
    const endDate = new Date(priceHistory[priceHistory.length - 1].date);
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const maxSellPrice = Math.max(...sellPrices);
    const minSellPrice = Math.min(...sellPrices);
    const maxBuyPrice = Math.max(...buyPrices);
    const minBuyPrice = Math.min(...buyPrices);

    return (
      <div className="max-w-max">
        <h3 className="text-2xl font-bold mt-4 text-center">Price History</h3>
        <p className="italic text-sm text-gray-500 text-center">
          Over the Last {dayDiff} Days
        </p>
        <div className="flex gap-2 divide-x mx-auto items-center">
          <div className="grid gap-2 items-center max-w-max text-right">
            <h3 className="text-xl font-bold italic">Sell</h3>
            <ul>
              <li className="border-b">
                Avg: {formatNumber(averageSellPrice)}
              </li>
              <li className="border-b">
                DoD Change:{" "}
                {recentSellPriceChange > 0 ? (
                  <span className="text-green-500">
                    {Math.abs(recentSellPriceChange).toFixed(2)}%
                  </span>
                ) : (
                  <span className="text-red-700">
                    ({Math.abs(recentSellPriceChange).toFixed(2)}%)
                  </span>
                )}
              </li>
              <li className="border-b">
                <div className="flex justify-end gap-2">
                  <span>Overall Trend:</span>
                  {overallSellTrend > 0 ? (
                    <ArrowUpFromLineIcon className="text-green-500" />
                  ) : (
                    <ArrowDownFromLineIcon className="text-red-700" />
                  )}
                </div>
              </li>
              <li className="border-b">Min: {formatNumber(minSellPrice)}</li>
              <li className="border-b">Max: {formatNumber(maxSellPrice)}</li>
            </ul>
          </div>

          <div className="grid gap-2 max-w-max text-left">
            <h3 className="ml-2 text-xl font-bold italic">Buy</h3>
            <ul>
              <li className="ml-2 border-b">
                Avg: {formatNumber(averageBuyPrice)}
              </li>
              <li className="ml-2 border-b">
                DoD Change:{" "}
                {recentBuyPriceChange > 0 ? (
                  <span className="text-green-500">
                    {Math.abs(recentBuyPriceChange).toFixed(2)}%
                  </span>
                ) : (
                  <span className="text-red-700">
                    ({Math.abs(recentBuyPriceChange).toFixed(2)}%)
                  </span>
                )}
              </li>
              <li className="ml-2 border-b">
                <div className="flex justify-start gap-2">
                  <span>Overall Trend:</span>
                  {overallBuyTrend > 0 ? (
                    <ArrowUpFromLineIcon className="text-green-500" />
                  ) : (
                    <ArrowDownFromLineIcon className="text-red-500" />
                  )}
                </div>
              </li>
              <li className="ml-2 border-b">
                Min Price: {formatNumber(minBuyPrice)}
              </li>
              <li className="ml-2 border-b">
                Max Price: {formatNumber(maxBuyPrice)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!listing) {
    return <p>Loading...</p>;
  }

  const processCompletedOrdersData = () => {
    return listing.completed_orders.map((order) => ({
      x: new Date(order.date),
      y: parseInt(order.price.replace(/,/g, ""), 10),
    }));
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Price History",
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${formatNumber(context.raw as number)}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function (
            value: any,
            index: number,
            values: any[]
          ): string | null {
            const totalTicks = values.length;
            const showEveryNthLabel = Math.ceil(totalTicks / 10); // Adjust 10 to change number of labels shown
            if (index % showEveryNthLabel === 0) {
              return this.getLabelForValue(value);
            }
            return null;
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4, // smooth curve
      },
      point: {
        radius: 5, // size of the point
      },
    },
  };

  const completedOrdersData = {
    datasets: [
      {
        label: "Completed Orders",
        data: processCompletedOrdersData(),
        backgroundColor: "rgba(15, 27, 191, 1)",
        borderColor: "rgba(15, 27, 191, 0.8)",
        pointRadius: 5,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        {listing.listing_name}
      </h1>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex gap-6 justify-between items-center">
          <div className="flex gap-2 items-center">
            <Image
              src={listing.item.baked_img}
              alt={listing.item.name}
              width={200}
              height={200}
              className="rounded-lg relative"
            />
          </div>
          {Commentary(listing.price_history)}
          <div className="text-right">
            <h2 className="text-xl font-bold">{listing.item.name}</h2>
            <p className="text-gray-600">{listing.item.team}</p>
            <p className="text-gray-600">Rarity: {listing.item.rarity}</p>
            <p className="text-gray-600">Overall: {listing.item.ovr}</p>
            <p className="text-gray-600">
              Series: {listing.item.series} ({listing.item.series_year})
            </p>
            <p className="text-gray-600">
              Position: {listing.item.display_position}
            </p>
            <p className="text-gray-600 flex justify-end gap-2 items-center">
              <span>Sell Price: </span>
              <span>{formatNumber(listing.best_sell_price)}</span>
              <span>
                <Image
                  src="/assets/images/stubs.webp"
                  className="h-5 w-auto "
                  alt="stubs logo"
                  width={20}
                  height={20}
                />
              </span>
            </p>
            <p className="text-gray-600 flex justify-end gap-2 items-center">
              <span>Buy Price: </span>
              <span>{formatNumber(listing.best_buy_price)}</span>
              <span>
                <Image
                  src="/assets/images/stubs.webp"
                  className="h-5 w-auto"
                  alt="stubs logo"
                  width={20}
                  height={20}
                />
              </span>
            </p>
          </div>
        </div>
        {listing.price_history.length > 0 && (
          <>
            <Line data={priceHistoryData} options={options} />
          </>
        )}
        {listing.completed_orders.length > 0 && (
          <>
            <h3 className="text-2xl font-bold mt-4">Completed Orders</h3>
            <Scatter
              data={completedOrdersData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        let label = context.dataset.label || "";
                        if (label) {
                          label += ": ";
                        }
                        if (context.parsed.y !== null) {
                          label += new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(context.parsed.y);
                        }
                        return label;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    type: "time",
                    time: {
                      unit: "day",
                      tooltipFormat: "MM/dd/yyyy HH:mm",
                    },
                    title: {
                      display: true,
                      text: "Date",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Price",
                    },
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SingleListingPage;
