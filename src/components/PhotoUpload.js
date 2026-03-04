import { useRef } from "react";
import S from "../styles/styles";

/**
 * PhotoUpload
 * Allows renters to attach photos when submitting a ticket.
 * Converts images to base64 for in-memory storage.
 * When a real database is added, swap base64 with a Supabase Storage upload.
 */
const PhotoUpload = ({ photos, onChange, maxPhotos = 3 }) => {
  const inputRef = useRef(null);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const remaining = maxPhotos - photos.length;
    const toProcess = files.slice(0, remaining);

    toProcess.forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        onChange((prev) => [
          ...prev,
          { name: file.name, url: ev.target.result, size: file.size },
        ]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const removePhoto = (index) => {
    onChange((prev) => prev.filter((_, i) => i !== index));
  };

  const canAdd = photos.length < maxPhotos;

  return (
    <div>
      {/* Photo thumbnails */}
      {photos.length > 0 && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          {photos.map((photo, i) => (
            <div key={i} style={{ position: "relative" }}>
              <img src={photo.url} alt={photo.name} style={S.photoThumb} />
              <button
                onClick={() => removePhoto(i)}
                style={{
                  position: "absolute", top: -6, right: -6,
                  width: 20, height: 20, borderRadius: 99,
                  background: "#FF2D2D", border: "none",
                  color: "#fff", fontSize: 11, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700,
                }}
              >✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      {canAdd && (
        <>
          <div
            style={{
              ...S.fileUpload,
              borderColor: "#ffffff25",
              transition: "border-color .15s",
            }}
            onClick={() => inputRef.current?.click()}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#E8622A55")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#ffffff25")}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>📷</div>
            <div style={{ fontWeight: 600, color: "#F0EDE8", marginBottom: 2 }}>
              Attach Photos
            </div>
            <div style={{ fontSize: 12, color: "#5A5570" }}>
              {photos.length}/{maxPhotos} photos · Click to browse · JPG, PNG
            </div>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={handleFiles}
          />
        </>
      )}

      {!canAdd && (
        <div style={{ fontSize: 12, color: "#5A5570", textAlign: "center", marginTop: 4 }}>
          Maximum {maxPhotos} photos attached
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
