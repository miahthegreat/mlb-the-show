// app/listings/[uuid]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { getListingByUUID } from "@/lib/api";
import Image from "next/image";
import { formatNumber } from "@/utils/formatNumber";
import { Listing, PriceHistoryEntry } from "@/types";
import { useParams } from "next/navigation";
import { Line } from "react-chartjs-2";
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
import { ArrowUpFromLineIcon, ArrowDownFromLineIcon } from "lucide-react";
import { DataTableDemo } from "@/components/DataTable";
import { cx } from "class-variance-authority";
import { cleanString } from "@/utils/cleanString";

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
      void fetchListing(uuid as string);
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
    labels: listing.price_history.map((entry) => entry.date),
    datasets: [
      {
        label: "Best Sell Price",
        data: listing.price_history.map(
          (entry: PriceHistoryEntry) => entry.best_sell_price
        ),
        borderColor: "rgba(15, 27, 191, 1)",
        backgroundColor: "rgba(15, 27, 191, 0.2)",
        tension: 0.4,
        fill: false,
        pointBackgroundColor: "rgba(15, 27, 191, 1)",
        pointRadius: 5,
      },
      {
        label: "Best Buy Price",
        data: listing.price_history.map(
          (entry: PriceHistoryEntry) => entry.best_buy_price
        ),
        borderColor: "rgba(240, 111, 12, 1)",
        backgroundColor: "rgba(240, 111, 12, 0.2)",
        tension: 0.4,
        fill: false,
        pointBackgroundColor: "rgba(240, 111, 12, 1)",
        pointRadius: 5,
      },
    ],
  };
  const Commentary = (priceHistory: PriceHistoryEntry[]) => {
    if (priceHistory.length < 2) {
      return <p>Not enough data to provide commentary.</p>;
    }
    const sellPrices = priceHistory.map(
      (entry: PriceHistoryEntry) => entry.best_sell_price
    );
    const buyPrices = priceHistory.map(
      (entry: PriceHistoryEntry) => entry.best_buy_price
    );
    const averageSellPrice =
      sellPrices.reduce((acc, price) => acc + price, 0) / sellPrices.length;

    const averageBuyPrice =
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
      <div className="w-full flex flex-col items-center justify-center">
        <h3 className="text-2xl font-bold mt-4 text-center hidden md:block">
          Price History
        </h3>
        <p className="italic text-sm text-gray-500 text-center">
          Over the Last {dayDiff} Days
        </p>
        <div className="grid grid-cols-2 items-center">
          <div className="grid gap-2 items-center w-full text-center border-r-2 p-2 border-blue-500">
            <h3 className="text-xl font-bold">Sell</h3>
            <ul className="grid gap-2">
              <li className="ring-1 ring-blue-200 text-xs shadow-lg rounded-full p-2 bg-slate-200 font-light text-gray-900 text-center">
                Avg: {formatNumber(Math.trunc(averageSellPrice))}
              </li>
              <li className="ring-1 ring-blue-200 text-xs shadow-lg rounded-full p-2 bg-slate-200 font-light text-gray-900 text-center">
                Change:{" "}
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
              <li className="ring-1 ring-blue-200 text-xs shadow-lg rounded-full p-2 bg-slate-200 font-light text-gray-900 text-center">
                <div className="flex items-center justify-center">
                  <span>Trend:</span>
                  {overallSellTrend > 0 ? (
                    <ArrowUpFromLineIcon className="text-green-500 h-3" />
                  ) : (
                    <ArrowDownFromLineIcon className="text-red-700 h-3" />
                  )}
                </div>
              </li>
              <li className="ring-1 ring-blue-200 text-xs shadow-lg rounded-full p-2 bg-slate-200 font-light text-gray-900 text-center">
                Min: {formatNumber(minSellPrice)}
              </li>
              <li className="ring-1 ring-blue-200 text-xs shadow-lg rounded-full p-2 bg-slate-200 font-light text-gray-900 text-center">
                Max: {formatNumber(maxSellPrice)}
              </li>
            </ul>
          </div>

          <div className="grid gap-2 w-full items-center text-center border-l-2 p-2 border-orange-500">
            <h3 className="text-xl font-bold">Buy</h3>
            <ul className="grid gap-2">
              <li className="ring-1 ring-orange-200 text-xs shadow-lg rounded-full p-2 bg-slate-200 font-light text-gray-900 text-center">
                Avg: {formatNumber(Math.trunc(averageBuyPrice))}
              </li>
              <li className="ring-1 ring-orange-200 text-xs shadow-lg rounded-full p-2 bg-slate-200 font-light text-gray-900 text-center">
                Change:{" "}
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
              <li className="ring-1 ring-orange-200 text-xs shadow-lg rounded-full p-2 bg-slate-200 font-light text-gray-900 text-center">
                <div className="flex items-center justify-center">
                  <span>Trend:</span>
                  {overallBuyTrend > 0 ? (
                    <ArrowUpFromLineIcon className="text-green-500 h-3" />
                  ) : (
                    <ArrowDownFromLineIcon className="text-red-500 h-3" />
                  )}
                </div>
              </li>
              <li className="ring-1 ring-orange-200 text-xs shadow-lg rounded-full p-2 bg-slate-200 font-light text-gray-900 text-center">
                Min: {formatNumber(minBuyPrice)}
              </li>
              <li className="ring-1 ring-orange-200 text-xs shadow-lg rounded-full p-2 bg-slate-200 font-light text-gray-900 text-center">
                Max: {formatNumber(maxBuyPrice)}
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

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
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
            value: number | string,
            index: number,
            values: Array<{ value: number | string }>
          ): string | null {
            const totalTicks = values.length;
            const showEveryNthLabel = Math.ceil(totalTicks / 10); // Adjust 10 to change number of labels shown
            if (index % showEveryNthLabel === 0) {
              return this.getLabelForValue(Number(value));
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

  const primaryBackgroundColor = `bg-${listing.item.team
    .toLowerCase()
    .replace(/\s/g, "")}-primary`;
  const primaryTextColor = `bg-${listing.item.team
    .toLowerCase()
    .replace(/\s/g, "")}-primary`;
  const secondaryBackgroundColor = `bg-${listing.item.team
    .toLowerCase()
    .replace(/\s/g, "")}-secondary`;
  const secondaryTextColor = `bg-${listing.item.team
    .toLowerCase()
    .replace(/\s/g, "")}-secondary`;
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="rounded-lg flex items-center flex-col shadow-lg ring ring-gray-50">
            <h1 className="py-2 rounded-t-lg flex w-full text-3xl content-center justify-center font-bold text-center md:text-left">
              {listing.listing_name}
            </h1>
            <Image
              src={listing.item.baked_img}
              alt={listing.item.name}
              width={230}
              height={230}
              className="rounded-b-lg relative"
            />
          </div>
          <div className="ring ring-gray-50 shadow-md p-4 rounded-lg flex-grow gap-2 grid grid-cols-1 md:flex-row md:flex items-center justify-between">
            <div className="md:hidden w-full h-full ring shadow-lg rounded-lg ring-blue-100 bg-blue-100 text-center">
              Price History
            </div>
            {Commentary(listing.price_history)}
            <div className="md:hidden text-center w-full h-full ring ring-orange-100 shadow-md rounded-lg bg-orange-100">
              General Info
            </div>
            <div className="min-w-max grid gap-2">
              <h2 className="hidden md:block text-xl font-bold">
                General Info
              </h2>
              <div className="text-gray-600 grid gap-2">
                <Image
                  src={`/assets/images/${listing.item.team
                    .toLowerCase()
                    .replace(/\s/g, "")}.png`}
                  className={cx(
                    "flex font-bold gap-2 shadow-md text-sm items-center rounded-full mx-auto p-1 ring",
                    listing &&
                      listing.item &&
                      listing.item.team &&
                      `bg-${listing.item.team
                        .toLowerCase()
                        .replace(/\s/g, "")}-secondary text-${listing.item.team
                        .toLowerCase()
                        .replace(/\s/g, "")}-primary ring-${listing.item.team
                        .toLowerCase()
                        .replace(/\s/g, "")}-primary`
                  )}
                  width={50}
                  height={50}
                  alt={`${cleanString(listing.item.team.toLowerCase())}`}
                />
                <span
                  className={cx(
                    "text-xs p-2 rounded-full shadow text-center",
                    listing &&
                      listing.item.rarity &&
                      `bg-${listing.item.rarity.toLowerCase()}`
                  )}
                >
                  {listing.item.rarity} | {listing.item.ovr} |{" "}
                  {listing.item.display_position}{" "}
                </span>

                <span
                  className={cx(
                    "flex font-bold p-2 gap-2 shadow-md text-xs items-center rounded-full justify-center",
                    listing &&
                      listing.item &&
                      listing.item.team &&
                      `bg-${listing.item.team
                        .toLowerCase()
                        .replace(/\s/g, "")}-secondary text-${listing.item.team
                        .toLowerCase()
                        .replace(/\s/g, "")}-primary`
                  )}
                >
                  {listing.item.series} Series
                </span>
              </div>
              <div
                className={cx(
                  "flex font-bold p-2 gap-2 shadow-md text-xs items-center rounded-full justify-center",
                  listing &&
                    listing.item &&
                    listing.item.team &&
                    `bg-${listing.item.team
                      .toLowerCase()
                      .replace(/\s/g, "")}-secondary text-${listing.item.team
                      .toLowerCase()
                      .replace(/\s/g, "")}-primary`
                )}
              >
                <span>Sell: {formatNumber(listing.best_sell_price)}</span>
                <span>
                  <Image
                    src="/assets/images/stubs.webp"
                    className="h-5 w-auto "
                    alt="stubs logo"
                    width={20}
                    height={20}
                  />
                </span>
              </div>
              <div
                className={cx(
                  "flex font-bold p-2 gap-2 shadow-md text-xs items-center rounded-full justify-center",
                  listing &&
                    listing.item &&
                    listing.item.team &&
                    `bg-${listing.item.team
                      .toLowerCase()
                      .replace(/\s/g, "")}-secondary text-${listing.item.team
                      .toLowerCase()
                      .replace(/\s/g, "")}-primary`
                )}
              >
                <span>Buy: {formatNumber(listing.best_buy_price)}</span>
                <span>
                  <Image
                    src="/assets/images/stubs.webp"
                    className="h-5 w-auto"
                    alt="stubs logo"
                    width={20}
                    height={20}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        {listing.price_history.length > 0 && (
          <div className="w-full ring ring-gray-50 mt-4 p-4 shadow-md rounded-lg">
            <Line data={priceHistoryData} options={options} />
          </div>
        )}
        <h1 className="text-2xl font-bold my-4 text-center">
          Completed Orders
        </h1>
        {listing.completed_orders.length > 0 && (
          <DataTableDemo data={listing.completed_orders} />
        )}
      </div>
    </div>
  );
};

export default SingleListingPage;
