class UserInfo {
  constructor({ titleSelector, descriptionSelector, avatarSelector }) {
    this._profileTitle = document.querySelector(titleSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      title: this._profileTitle.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo({ title, description }) {
    this._profileTitle.textContent = title;
    this._profileDescription.textContent = description;
  }

  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}

export default UserInfo;
