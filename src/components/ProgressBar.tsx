export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="progress-container fixed-top">
      <span
        className="progress-bar"
        style={{
          width: `${progress}%`,
          backgroundColor: progressToRGB(progress),
        }}
      ></span>
    </div>
  );
}

function progressToRGB(p: number): string {
  const r = 255 * ((100 - p) / 100);
  const g = 255 * (p / 100);
  return `rgb(${r}, ${g}, 0)`;
}
