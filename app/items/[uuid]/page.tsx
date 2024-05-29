"use client";

import { getItemByUUID } from "@/lib/api";
import { ItemDetail } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AttributeBarChart from "@/components/AttributeBarChart";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import PitchBarChart from "@/components/PitchBarChart";
import { cx } from "class-variance-authority";
import { getRarityClass } from "@/utils/getRarityClass";

const ItemDetailPage = () => {
  const { uuid } = useParams();
  const [item, setItem] = useState<ItemDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        if (typeof uuid === "string") {
          const itemData = await getItemByUUID(uuid);
          setItem(itemData);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching item detail:", err);
        setError("Failed to load item details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [uuid]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!item) {
    return null;
  }

  const attributes = [
    { name: "Stamina", value: item.stamina ?? 0 },
    { name: "Pitching Clutch", value: item.pitching_clutch ?? 0 },
    { name: "Hits Per BF", value: item.hits_per_bf ?? 0 },
    { name: "K Per BF", value: item.k_per_bf ?? 0 },
    { name: "BB Per BF", value: item.bb_per_bf ?? 0 },
    { name: "HR Per BF", value: item.hr_per_bf ?? 0 },
    { name: "Pitch Velocity", value: item.pitch_velocity ?? 0 },
    { name: "Pitch Control", value: item.pitch_control ?? 0 },
    { name: "Pitch Movement", value: item.pitch_movement ?? 0 },
    { name: "Contact Left", value: item.contact_left ?? 0 },
    { name: "Contact Right", value: item.contact_right ?? 0 },
    { name: "Power Left", value: item.power_left ?? 0 },
    { name: "Power Right", value: item.power_right ?? 0 },
    { name: "Plate Vision", value: item.plate_vision ?? 0 },
    { name: "Plate Discipline", value: item.plate_discipline ?? 0 },
    { name: "Batting Clutch", value: item.batting_clutch ?? 0 },
    { name: "Bunting Ability", value: item.bunting_ability ?? 0 },
    { name: "Drag Bunting Ability", value: item.drag_bunting_ability ?? 0 },
    { name: "Hitting Durability", value: item.hitting_durability ?? 0 },
    { name: "Fielding Durability", value: item.fielding_durability ?? 0 },
    { name: "Fielding Ability", value: item.fielding_ability ?? 0 },
    { name: "Arm Strength", value: item.arm_strength ?? 0 },
    { name: "Arm Accuracy", value: item.arm_accuracy ?? 0 },
    { name: "Reaction Time", value: item.reaction_time ?? 0 },
    { name: "Blocking", value: item.blocking ?? 0 },
    { name: "Speed", value: item.speed ?? 0 },
    { name: "Baserunning Ability", value: item.baserunning_ability ?? 0 },
    { name: "Baserunning Aggression", value: item.baserunning_aggression ?? 0 },
  ].filter((attribute) => attribute.value > 0);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">{item.name}</h1>
      <div className="flex justify-center mb-4">
        <div
          className={cx(
            "w-full max-w-6xl rounded-lg p-6",
            item.rarity && getRarityClass(item.rarity)
          )}
        >
          <div className="flex justify-between item-center">
            <Image
              src={item.baked_img || ""}
              alt={item.name || "Item image"}
              width={210}
              height={296}
              className="mb-4 rounded-lg"
            />
            <div>
              <p className="text-gray-600">
                <strong>Rarity:</strong> {item.rarity}
              </p>
              {item.type === "mlb_card" && (
                <>
                  <p className="text-gray-600">
                    <strong>Team:</strong> {item.team}
                  </p>
                  <p className="text-gray-600">
                    <strong>Overall Rating:</strong> {item.ovr}
                  </p>
                  <p className="text-gray-600">
                    <strong>Age:</strong> {item.age}
                  </p>
                  <p className="text-gray-600">
                    <strong>Batting Hand:</strong> {item.bat_hand}
                  </p>
                  <p className="text-gray-600">
                    <strong>Throwing Hand:</strong> {item.throw_hand}
                  </p>
                  <p className="text-gray-600">
                    <strong>Weight:</strong> {item.weight}
                  </p>
                  <p className="text-gray-600">
                    <strong>Height:</strong> {item.height}
                  </p>
                  <p className="text-gray-600">
                    <strong>Born:</strong> {item.born}
                  </p>
                </>
              )}
            </div>
          </div>
          {item.type === "mlb_card" && (
            <>
              {item.quirks && item.quirks.length > 0 && (
                <div className="flex gap-4">
                  {item.quirks.map((quirk, index) => (
                    <HoverCard key={index} openDelay={200}>
                      <HoverCardTrigger>
                        <div className="mt-2">
                          <Image
                            src={quirk.img}
                            alt={quirk.name}
                            width={40}
                            height={40}
                            className="bg-gray-600 rounded ring-gray-600 ring"
                          />
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <p className="font-bold">{quirk.name}</p>
                        <p className="text-sm italic font-light">
                          {quirk.description}
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
              )}
              <AttributeBarChart attributes={attributes} />
              {item.pitches && item.pitches.length > 0 && (
                <PitchBarChart pitches={item.pitches} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
