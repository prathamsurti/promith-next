/**
 * Sync Graphic (24/7 Assistance style with neumorphism)
 */
export const SyncGraphic = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="sync-support-container">
        {/* Status indicator dots */}
        <div className="sync-status-indicators">
          <div className="sync-status-dot" />
          <div className="sync-status-dot sync-status-dot-hidden" />
          <div className="sync-status-dot" />
        </div>
        
        {/* Center circle with neumorphism */}
        <div className="sync-neuro-circle">
          <div className="sync-time-badge">24/7</div>
          <div className="sync-support-icon" />
        </div>
      </div>
    </div>
  );
};
