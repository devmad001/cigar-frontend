<template>
  <section id="profile-page" class="flex_wrapper">
    <profile-avatar/>
    <div class="right-container">
      <user-block :title="'Contacts'" :openModal="openEditContactsModal">
        <template v-slot:contacts>
          <div class="info-block">
            <span class="user-info">State:</span>
            <p>{{ userInfo?.state || 'unknown' }}</p>
          </div>
          <div class="info-block">
            <span class="user-info">City:</span>
            <p >{{ userInfo?.city || 'unknown' }}</p>
          </div>
          <div class="info-block">
            <span class="user-info">Address:</span>
            <p>{{ userInfo?.address || 'unknown' }}</p>
          </div>
          <div class="info-block">
            <span class="user-info">Phone number:</span>
            <p>{{ userInfo?.phone_number || 'unknown' }}</p>
          </div>
        </template>
      </user-block>
      <user-block :title="'Personal'" :openModal="openEditPersonalDataModal">
        <template v-slot:contacts>
            <div class="sn-block" v-if="userInfo?.social_type">
              <svg v-if="isFacebookLogin" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25ZM26.7948 25.9997H31.2069L31.7948 20.3239H26.7948V16.9815C26.7673 16.7828 26.7841 16.5806 26.8437 16.3892C26.9034 16.1978 27.0046 16.0218 27.14 15.874C27.2754 15.7261 27.4418 15.6099 27.6272 15.5337C27.8127 15.4575 28.0127 15.4231 28.213 15.433H31.8054V9.91936L26.8539 9.89814C25.95 9.82649 25.0414 9.95177 24.1907 10.2654C23.3399 10.5789 22.5673 11.0733 21.9262 11.7144C21.2851 12.3556 20.7907 13.1281 20.4771 13.9789C20.1635 14.8296 20.0383 15.7382 20.1099 16.6421V20.3194H16.9281V25.9997H20.1099V42.1618H26.7948V25.9997Z" fill="#3B5999"/>
              </svg>
              <svg v-if="isGoogleLogin" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.0811 30.2158L9.34062 36.7131L2.97939 36.8477C1.07832 33.3216 0 29.2873 0 25.0002C0 20.8546 1.0082 16.9452 2.79531 13.5029H2.79668L8.45996 14.5412L10.9408 20.1705C10.4216 21.6843 10.1386 23.3093 10.1386 25.0002C10.1388 26.8354 10.4712 28.5936 11.0811 30.2158Z" fill="#FBBB00"/>
                <path d="M49.5629 20.3296C49.85 21.8419 49.9997 23.4037 49.9997 24.9999C49.9997 26.7897 49.8115 28.5356 49.453 30.2197C48.236 35.9505 45.0561 40.9546 40.6509 44.4958L40.6495 44.4944L33.5163 44.1305L32.5067 37.8282C35.4298 36.114 37.7142 33.4313 38.9175 30.2197H25.5493V20.3296H39.1125H49.5629Z" fill="#518EF8"/>
                <path d="M40.6498 44.4941L40.6512 44.4955C36.3669 47.9392 30.9245 49.9996 25.0001 49.9996C15.4795 49.9996 7.20205 44.6782 2.97949 36.8472L11.0812 30.2153C13.1924 35.8499 18.6278 39.8609 25.0001 39.8609C27.7391 39.8609 30.3051 39.1205 32.5069 37.8279L40.6498 44.4941Z" fill="#28B446"/>
                <path d="M40.9575 5.75547L32.8586 12.3859C30.5798 10.9615 27.886 10.1387 25.0001 10.1387C18.4836 10.1387 12.9465 14.3337 10.941 20.1703L2.79678 13.5027H2.79541C6.95615 5.48076 15.338 0 25.0001 0C31.066 0 36.6278 2.16074 40.9575 5.75547Z" fill="#F14336"/>
              </svg>

              <div class="sn-data">
                <span class="sn-type" v-if="isFacebookLogin">Logged via Facebook</span>
                <span class="sn-type" v-if="isGoogleLogin">Logged via Google</span>
                <span class="sn-username">{{ userInfo?.full_name }}</span>
              </div>
            </div>
          <div v-else>
            <div class="info-block">
              <span class="user-info">Your name:</span>
              {{ userInfo?.full_name }}
            </div>
            <div class="info-block">
              <span class="user-info">Email:</span>
              {{ userInfo?.email }}
            </div>
          </div>
        </template>
      </user-block>
      <div v-if="!isGoogleLogin" class="change-password-button">
        <a @click="openChangePasswordModal" class="change-password hvr-radial-out lite">Change my password</a>
      </div>
    </div>

    <base-dialog modalClass :show="editContactsIsOpen" title="Edit Contacts" @close="closeModal" isContactEdit>
      <contacts-block-edit :userInfo="userInfo" @closeContactsBlockEdit="closeModal"></contacts-block-edit>
      <template v-slot:footer>
        <button aria-label="edit contacts" class="modal-link" @click.prevent="closeModal(); openEditContactsModal();">Edit Contacts</button>
      </template>
    </base-dialog>  

    <base-dialog modalClass :show="changePassword" title="Change password" @close="closeModal" isChangePassword>
      <change-password @closeChangePassword="closeModal"></change-password>
      <template v-slot:footer>
        <button aria-label="change password" class="modal-link" @click.prevent="closeModal(); openChangePasswordModal();">Change password</button>
      </template>
    </base-dialog> 

     <base-dialog modalClass :show="editPersonalData" title="Edit Personal Data" @close="closeModal" isEditPersonalData>
      <edit-personal-data :userInfo="userInfo" @closeEditPersonalData="closeModal"></edit-personal-data>
      <template v-slot:footer>
        <button aria-label="edit personal data" class="modal-link" @click.prevent="closeModal(); openEditPersonalDataModal();">Edit Personal Data</button>
      </template>
    </base-dialog>

    <base-dialog modalClass modalCrop :show="cropAvatarModal || uploadedAvatar" title="Crop avatar" @close="closeModal" isCropAvatarModal>
      <CropAvatarModal @closeCropAvatarModal="closeModal"/>
      <template v-slot:footer>
        <button aria-label="edit personal data" class="modal-link" @click.prevent="closeModal(); openCropAvatarModalModal();">Edit Personal Data</button>
      </template>
    </base-dialog>
  </section>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    BaseDialog: defineAsyncComponent(() => 
      import('@/components/ui/BaseDialog')
    ),
    ContactsBlockEdit: defineAsyncComponent(() => 
      import('@/components/layout/profileComponents/ContactsBlockEdit')
    ),
    ChangePassword: defineAsyncComponent(() => 
      import('@/components/layout/profileComponents/ChangePassword')
    ),
    EditPersonalData: defineAsyncComponent(() => 
      import('@/components/layout/profileComponents/EditPersonalData')
    ),
    CropAvatarModal: defineAsyncComponent(() => 
      import('@/components/layout/profileComponents/AvatarCrop/CropAvatarModal')
    ),
    UserBlock: defineAsyncComponent(() => 
      import('@/components/layout/profileComponents/UserBlock')
    ),
    ProfileAvatar: defineAsyncComponent(() => 
      import('@/components/layout/profileComponents/TheAvatar')
    ),
  },
  props: {
    id: Number
  },
  data() {
    return {
      changePassword: false,
      editPersonalData: false,
      editContactsIsOpen: false,
      cropAvatarModal: false
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.user.current_user
    },
    uploadedAvatar() {
      return this.$store.getters.croppedAvatar
    },
    isGoogleLogin() {
      return this.userInfo?.social_type === 'google'
    },
    isFacebookLogin() {
      return this.userInfo?.social_type === 'facebook'
    },
  },
  methods: {
    openEditContactsModal() {
      this.editContactsIsOpen = true;
    },
    openChangePasswordModal() {
      this.changePassword = true;
    },
    openEditPersonalDataModal() {
      this.editPersonalData = true; 
    },
    openCropAvatarModalModal() {
      this.cropAvatarModal = true;
    },
    closeModal() {
      this.editContactsIsOpen = false;
      this.changePassword = false;
      this.editPersonalData = false;
      this.cropAvatarModal = false;
      this.$store.dispatch('setCroppedAvatar', null)
    }
  },
}
</script>

<style lang="scss" scoped>
  #profile-page {
    width: 100%;
    height: 100vh;
  }

  .modalStyle { margin-top: 30px; }

  .sn-block {
    display: flex;
    margin-top: 16px;
  }

  .sn-data {
    align-items: flex-start;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .sn-type {
    font-weight: 700;
    font-size: 14px;
    color: #B26D28;
  }

  .sn-username { font-size: 22px; }

  .change-password-button {
    display: flex;
    justify-content: center;
  }

  .header {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #F2E2D3;
    padding-bottom: 16.5px;
    font-size: 22px;
    font-weight: 400;
    text-transform: uppercase;
  }

  .change-password {
    margin-top: 15px;
    cursor: pointer;
    padding: 12px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #6C3F13;
    border-radius: 25px;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    text-decoration: none;
    color: #fff;
    padding: 12px 30px;
  }

  .info-block {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
  }

  .user-info { color: #B26D28; }
  .right-container { margin-left: 120px; }

  @media screen and (max-width: 960px) {
    .right-container { margin-left: 50px; }
  }

  @media screen and (max-width: 720px) {
    #profile-page { width: 100%; }
  }

  @media screen and (max-width: 1440px) {
    #profile-page { margin-left: 0; }
  }

  @media screen and (max-width: 720px) {
    .flex_wrapper {
      flex-direction: column;
      align-items: center;
    }
  }

  @media screen and (max-width: 720px) {
    .right-container {
      margin-left: 0;
      width: 100%;
    }
  }

  @media screen and (max-width: 720px) {
    .contacts-wrapper {
      width: auto;
      margin-top: 50px;
    }
  }

  @media screen and (max-width: 720px) {
    #profile-page {
      height: auto;
      margin-bottom: 50px;
    }
  }
</style>
