import React, { useState, useEffect } from "react";
import { searchTracks, getPopularTracks } from "../services/spotify";
import TrackCard from "./TrackCard";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Music, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

const SpotifySearch = () => {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchResult, setIsSearchResult] = useState(false);

  useEffect(() => {
    const fetchPopularTracks = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching popular tracks...");
        const popularTracks = await getPopularTracks();
        setTracks(popularTracks);
        setIsSearchResult(false);
      } catch (error) {
        console.error("Error fetching popular tracks:", error);
        toast.error("Gagal memuat lagu populer");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularTracks();
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error("Masukkan nama lagu yang ingin dicari");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Mencari lagu:", query);
      const results = await searchTracks(query);
      setTracks(results);
      setIsSearchResult(true);
      toast.success(`Ditemukan ${results.length} lagu`);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal mencari lagu. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleShowPopular = async () => {
    setIsLoading(true);
    setQuery("");
    try {
      const popularTracks = await getPopularTracks();
      setTracks(popularTracks);
      setIsSearchResult(false);
      toast.success("Menampilkan lagu populer");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal memuat lagu populer");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Music className="w-8 h-8 text-green-500" />
          <h1 className="text-3xl font-bold text-gray-800">Spotify Search</h1>
        </div>
        <p className="text-gray-600">Cari lagu favorit kamu di Spotify</p>
      </div>

      <div className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Masukkan nama lagu atau artis..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button
          onClick={handleSearch}
          disabled={isLoading}
          className="flex items-center gap-2 bg-black text-white hover:bg-white hover:text-black border border-black"
        >
          <Search className="w-4 h-4" />
          {isLoading ? "Mencari..." : "Cari"}
        </Button>
        <Button
          variant="outline"
          onClick={handleShowPopular}
          disabled={isLoading}
          className="flex items-center gap-2 text-black bg-white hover:bg-black hover:text-white border border-black"
        >
          <TrendingUp className="w-4 h-4" />
          Populer
        </Button>
      </div>

      {tracks.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            {isSearchResult ? (
              <>
                <Search className="w-5 h-5" />
                Hasil Pencarian ({tracks.length} lagu)
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                Lagu Populer ({tracks.length} lagu)
              </>
            )}
          </h2>
          <div className="space-y-3">
            {tracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="text-center text-gray-500 mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-3"></div>
          <p>Memuat lagu...</p>
        </div>
      )}

      {tracks.length === 0 && !isLoading && (
        <div className="text-center text-gray-500 mt-8">
          <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Tidak ada lagu untuk ditampilkan.</p>
        </div>
      )}
    </div>
  );
};

export default SpotifySearch;
