import React from "react";

function Card(props) {
  const fallbackImageUrl = "https://via.placeholder.com/600x400"; // Fallback image URL

  return (
    <div className="everything-card mt-10">
      <div className="everything-card flex flex-wrap p-5 gap-4 mb-1">
        <b className="title">{props.title}</b>
        <div className="everything-card-img mx-auto">
          <img
            className="everything-card-img"
            src={props.imgUrl || fallbackImageUrl} // Use fallback if imgUrl is null
            alt={props.title || "Image for article"}
            onError={(e) => {
              e.target.src = fallbackImageUrl; // Fallback on error
            }}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </div>
        <div className="description">
          <p className="description-text leading-7">
            {props.description ? (
              props.description.length > 200 
                ? `${props.description.substring(0, 200)}...` 
                : props.description
            ) : (
              "No description available."
            )}
          </p>
        </div>
        <div className="info">
          <div className="source-info flex items-center gap-2">
            <span className="font-semibold">Source:</span>
            <a
              href={props.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link underline break-words"
            >
              {props.source?.substring(0, 70) || "Unknown"}
            </a>
          </div>
          <div className="origin flex flex-col">
            <p className="origin-item">
              <span className="font-semibold">Author:</span>
              {props.author || "Unknown"}
            </p>
            <p className="origin-item">
              <span className="font-semibold">Published At:</span>
              {new Date(props.publishedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
