export default function UserCardMobile() {
  return (
    <div className="post-details-single white-bg-shw skeleton3">
      <div className="d-flex align-items-center">
        <div className="small-img skeleton3-img">
          <div className="skeleton3-placeholder skeleton3-circle"></div>
        </div>
        <h3 className="skeleton3-placeholder skeleton3-text skeleton3-line"></h3>
      </div>
      <a
        href="#"
        className="light-btn w-100 skeleton3-placeholder skeleton3-btn"
      ></a>
      <ul>
        <li>
          <p className="skeleton3-placeholder skeleton3-text skeleton3-line"></p>
        </li>
        <li>
          <p className="skeleton3-placeholder skeleton3-text skeleton3-line"></p>
        </li>
        <li>
          <p className="skeleton3-placeholder skeleton3-text skeleton3-line"></p>
        </li>
      </ul>
    </div>
  );
}
