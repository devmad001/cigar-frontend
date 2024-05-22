<template>
  <div class="avatar-wrapper">
    <profile-header :title="'Avatar'"/>
    <div class="user-avatar">
      <div class="avatar">
        <img :src="avatar && avatar" alt="avatar" class="avatar-image" v-if="avatar && avatar !== 'undefined'">
        <div class="blank-avatar" v-else>
          <p class="user-name">{{ firstLetters }}</p>
        </div>
      </div>
    </div>
    <div class="upload-button" v-if="!avatar">
      <input ref="input" name="image" class="file-input" id="file-upload" type="file" @change="setImage"/>
      <label for="file-upload" class="avatar-button upload hvr-radial-out lite">Upload photo</label>
    </div>
    <div v-else class="upload-button">
      <button aria-label="delete photo" :disabled="loader" class="avatar-button delete" @click="deleteAvatar()">
        <Loader v-if="loader"/>
        <span v-else>Delete Photo</span>
      </button>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    Loader: defineAsyncComponent(() => 
      import('@/components/ui/BaseLoader')
    ),
    ProfileHeader: defineAsyncComponent(() => 
      import('@/components/layout/profileComponents/TheHeader')
    )
  },
  data() {
    return {
      file: '',
    }
  },
  props: {
    title: {
      type: String
    }
  },
  computed: {
    loader() {
      return this.$store.getters.loader
    },
    userName() {
      return this.$store.getters.userName;
    },
    firstLetters() {
      const name = this.userName.split(' ');
      if (name[0] && name[1]) return name[0][0] + name[1][0];
      return name[0][0];
    },
    avatar() {
      return this.$store.getters.user.current_user?.avatar_image?.url;
    },
    token() {
      return this.$store.getters.token;
    },
  },
  methods: {
    setImage(e) {
      let file = e.target.files[0];

      if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file');
        return;
      }

      if (typeof FileReader === 'function') {
        const reader = new FileReader();

        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          this.$store.dispatch('setCroppedAvatar', this.imgSrc)
        };

        reader.readAsDataURL(file);
      } else {
        alert('Sorry, FileReader API not supported');
      }
    },
    async deleteAvatar() {
      this.$store.dispatch('setLoader', true)
      const response = await fetch(
          'https://hiscigar.com/api/v1/users/profile',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Session-Token': this.token
            },
            body: JSON.stringify({remove_image: 'true'})
          }
      );
      const responseData = await response.json();
      if (responseData) this.$store.dispatch('setLoader', false)
      this.$store.dispatch('getUserInfo')
    },
  }
}
</script>

<style lang="scss" scoped>
  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .file-input {
    display: none;
  }

  .avatar-wrapper {
    width: 280px;
  }

  @media screen and (max-width: 720px) {
    .user-avatar {
      .avatar {
        height: 100%;
      }
    }
  }

  @media screen and (max-width: 720px) {
    .avatar-wrapper {
      width: 100%;
    }
  }

  .avatar {
    display: flex;
    height: 280px;
    align-items: center;
    justify-content: center;
  }

  .avatar:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  .user-name {
    font-size: 40px;
    color: #6C3F13;
    font-weight: 700;
  }

  .user-avatar {
    margin-top: 20px;
    background-color: #F2E2D3;
  }

  .avatar-button {
    margin-top: 15px;
    cursor: pointer;
    width: 179px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    font-size: 20px;
    line-height: 24px;
    text-decoration: none;
    height: 50px;
    &:disabled {
      background-color: #E5E5E5;
      pointer-events: none;
    }
  }

  .delete {
    background-color: #FCF5EF;
    color: #F1B57A;
    font-weight: 400;
  }

  .upload {
    background-color: #6C3F13;
    color: #fff;
    font-weight: 700;
  }

  .upload-button {
    display: flex;
    justify-content: center;
  }
</style>

