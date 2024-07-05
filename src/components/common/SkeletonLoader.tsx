const SkeletonLoader = () => {
  return (
    <div className="sigle-post white-bg-shw">
      <div className="post-img-w">
        <div className="post-card-top skeleton2-header">
          <div className="post-img-name">
            <div className="post-profile position-relative skeleton2 skeleton2-avatar"></div>
            <div>
              <div className="skeleton2 skeleton2-text" style={{ width: '100px' }}></div>
              <div className="skeleton2 skeleton2-text" style={{ width: '60px' }}></div>
            </div>
          </div>
          <div className="skeleton skeleton2-icon"></div>
        </div>
        <div className="post-main-image skeleton2 skeleton2-img"></div>
        <div className="post-content">
          <div className="skeleton2 skeleton2-text" style={{ width: '80%' }}></div>
          <div className="skeleton2 skeleton2-text" style={{ width: '60%' }}></div>
          <div className="skeleton2 skeleton2-text" style={{ width: '90%' }}></div>
        </div>
        <div className="social-share skeleton2-footer">
          <ul className="skeleton2-list">
            <li>
              <p className="position-relative skeleton2 skeleton2-icon"></p>
              <div className="skeleton2 skeleton2-text" style={{ width: '50px' }}></div>
            </li>
            <li>
              <p className="position-relative skeleton2 skeleton2-icon"></p>
              <div className="skeleton2 skeleton2-text" style={{ width: '50px' }}></div>
            </li>
          </ul>
          <div className="share-round position-relative skeleton2 skeleton2-icon"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
