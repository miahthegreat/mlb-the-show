export const getRarityClass = (rarity: string): string => {
    switch (rarity.toLowerCase()) {
      case "common":
        return "bg-common glassy";
      case "bronze":
        return "bg-bronze glassy";
      case "silver":
        return "bg-silver glassy";
      case "gold":
        return "bg-gold glassy";
      case "diamond":
        return "bg-diamond glassy";
      default:
        return "bg-white";
    }
  };