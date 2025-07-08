import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

const TrackCard = ({ track }) => {
  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {track.album.images[0] && (
            <img
              src={track.album.images[0].url}
              alt={track.album.name}
              className="w-16 h-16 rounded-md object-cover"
            />
          )}

          <div className="flex-1">
            <h3 className="font-semibold text-lg">{track.name}</h3>
            <p className="text-gray-600">
              {track.artists.map((artist) => artist.name).join(", ")}
            </p>
            <p className="text-sm text-gray-500">{track.album.name}</p>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(track.external_urls.spotify, "_blank")}
              className="flex items-center gap-2 text-black cursor-pointer hover:translate-y-[-2px] transition-all duration-300 hover:bg-[#1DB954] "
            >
              <ExternalLink className="w-4 h-4" />
              Spotify
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackCard;
