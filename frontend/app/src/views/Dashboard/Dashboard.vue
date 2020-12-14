<template>
<div>
    <h1 class="title">Dashboard</h1>
    <cv-accordion ref="acc">
        <cv-accordion-item open>
            <template slot="title">Your Info</template>
            <template slot="content">
                <p>
                    <b>Name</b>: {{ name }} <br /><br />
                    <b>Email</b>: {{ email }}
                </p>
            </template>
        </cv-accordion-item>
        <cv-accordion-item open>
            <template slot="title">API Key Info </template>
            <template slot="content">
                - This API key is to be used responsibly.<br />
                - Please keep this key stored safely away from the public to disallow
                unauthorized access.<br />
                - If key is abused, it may be taken away at any given time.<br />
                - If your key gets compromised, please regenerate a new key.
                <div class="key-input">
                    <cv-text-input class="api" id="apikeyinput" label="API Key:" helper-text="" placeholder="" v-model="apiKey" type="password" :password-visible="keyVisible" readonly passwordHideLabel="Hide API Key" passwordShowLabel="Show API Key">
                    </cv-text-input>

                    <div class="api_btns">
                        <cv-button kind="danger" style="margin-right:5px;" size="small" @click="showAPIKey">
                            {{ showApiKeyText }}
                        </cv-button>
                        <cv-button kind="secondary" size="small" @click="copyAPIKey">
                            {{ copyLabel }}
                        </cv-button>
                    </div>
                </div>
                <div v-if="apiKeyExpiryStatus" class="api_expiry">
                    Your API key expires/expired on {{ apiKeyExpiry }}
                </div>
                <div style="font-size:1.3rem;font-weight:bold;padding-bottom:1vh;padding-top:4vh;">
                    Rate Limits
                </div>
                <div>
                    20 requests every 1 second(s) (Under Construction)<br />
                    100 requests every 2 minutes(s) (Under Construction)
                </div>
                <div class="generateKey">
                    <cv-button kind="danger" style="margin-right:5px;" @click="generateKey">
                        Generate New Key
                    </cv-button>
                </div>
            </template>
        </cv-accordion-item>
        <cv-accordion-item open>
            <template slot="title">Change Password</template>
            <template slot="content">
                <div style="color:#da1e28;">
                    Note: Changing password invalidates your current API Key. A new key
                    will need to be generated. <br /><br />
                </div>
                <cv-text-input class="api" label="Current password" helper-text="" placeholder="" v-model="oldPassword" type="password" passwordHideLabel="Hide Password" passwordShowLabel="Show Password">
                    <template v-if="!oldPasswordValid" slot="invalid-message">{{
              oldPasswordError
            }}</template>
                </cv-text-input>
                <cv-text-input class="api" label="New password" helper-text="" placeholder="" v-model="newPassword" type="password" passwordHideLabel="Hide Password" passwordShowLabel="Show Password">
                    <template v-if="!newPasswordValid" slot="invalid-message">
                        {{ passwordError }}</template>
                </cv-text-input>
                <cv-text-input class="api" label="Confirm new password" helper-text="" placeholder="" v-model="confirmNewPassword" type="password" passwordHideLabel="Hide Password" passwordShowLabel="Show Password">
                    <template v-if="!confirmNewPasswordValid" slot="invalid-message">Passwords do not match</template>
                </cv-text-input>
                <br />
                <cv-button kind="danger" class="btn_change_password" @click="changePassword">
                    Change password
                </cv-button>
            </template>
        </cv-accordion-item>
        <cv-accordion-item open>
            <template slot="title">Delete Account</template>
            <template slot="content">
                <div style="color:#f4f4f4;">
                    Once you delete your account, there is no going back. Please be
                    certain. <br />
                    With the deletion of your account, your API key will be invalidated
                    and you will need to make a new account to re-use the API.<br /><br />
                    <div class="del_acc">
                        <cv-button kind="danger" class="btn_delete_account" @click="deleteAccount">
                            Delete Account
                        </cv-button>
                    </div>
                </div>
            </template>
        </cv-accordion-item>
    </cv-accordion>
    <cv-modal kind="danger" size="default" :visible="change_pwd_modal" @modal-hide-request="cancelChangePassword" @primary-click="changePasswordModel" @secondary-click="cancelChangePassword" :auto-hide-off="true">
        <template slot="title">Change Password</template>
        <template slot="content">
            <p>
                Changing password invalidates your current API Key. <br />A new key
                will need to be generated. <br />
                <br />
                Are you sure you want to change your password?
            </p>
        </template>
        <template slot="secondary-button" style="border-radius:0px;">Cancel</template>
        <template slot="primary-button">Change password</template>
    </cv-modal>

    <cv-modal kind="danger" size="default" :visible="delete_acc_modal" @modal-hide-request="cancelDeleteAccount" @primary-click="deleteAccountSubmit" @secondary-click="cancelDeleteAccount" :auto-hide-off="true">
        <template slot="title">Delete Account</template>
        <template slot="content">
            <p>
                Once you delete your account, there is no going back. Please be
                certain. <br />
                With the deletion of your account, your API key will be invalidated
                and you will need to make a new account to re-use the API.
                <br /><br />
                Please enter your password if you wish to delete your account.
                <cv-text-input class="api" label="Password" helper-text="" placeholder="" v-model="delPassword" type="password" passwordHideLabel="Hide Password" passwordShowLabel="Show Password">
                    <template v-if="!delPasswordValid" slot="invalid-message">
                        {{ delPasswordError }}</template>
                </cv-text-input>
            </p>
        </template>
        <template slot="secondary-button" style="border-radius:0px;">Cancel</template>
        <template slot="primary-button">Delete account</template>
    </cv-modal>
</div>
</template>

<style>
.title {
    padding-bottom: 15vh;
}

.bx--accordion__heading {
    background-color: #202020;
}

.bx--accordion__content {
    background-color: #181818;
}

.bx--accordion__title {
    font-size: 1.3rem;
}

input {
    border-radius: 5px;
}

.key-input {
    display: flex;
    padding-left: 25vw;
}

.api_btns {
    padding-top: 2.5vh;
    padding-left: 5px;
}

.api_expiry {
    text-align: center;
    padding-left: 15vw;
    font-size: 1.5rem;
    color: #da1e28;
}

.generateKey {
    text-align: center;
    padding-top: 2.5vh;
    padding-left: 15vw;
}

.bx--modal {
    width: 100vw;
    height: 100%;
    overflow-x: hidden;
}

html {
    height: auto;
}

@media only screen and (max-device-width: 480px) {
    .key-input {
        display: block;
        padding-left: 0px;
    }

    .title {
        padding-bottom: 8vh;
    }

    .bx--modal-header {
        padding-top: 70vh;
    }

    .api_btns {
        text-align: center;
        padding-top: 5px;
        padding-left: 0px;
    }

    .api_expiry {
        text-align: center;
        padding-left: 0vw;
        font-size: 1rem;
        color: #da1e28;
    }

    .generateKey {
        text-align: center;
        padding-top: 2.5vh;
        padding-left: 0vw;
    }

    .del_acc {
        text-align: center;
    }
}

.bx--btn--danger {
    border-radius: 5px;
    height: 2.5rem;
}

.bx--btn--secondary {
    border-radius: 5px;
    height: 2.5rem;
}
</style>

<script>
import {
    authInfo
} from '../../helpers/auth-info';

import axios from 'axios';
import router from '../../router';

export default {
    name: 'Dashboard',
    title: 'Lyrics API - Dashboard',
    components: {},
    data() {
        return {
            name: authInfo().firstName + ' ' + authInfo().lastName,
            email: authInfo().email,
            apiKey: 'None',
            keyVisible: false,
            copyLabel: 'Copy',
            apiKeyExpiry: 'July 1st 2020',
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            oldPasswordValid: true,
            newPasswordValid: true,
            confirmNewPasswordValid: true,
            change_pwd_modal: false,
            delete_acc_modal: false,
            passwordError: '',
            delPassword: '',
            delPasswordError: '',
            delPasswordValid: false,
            oldPasswordError: '',
            showApiKeyText: 'Show',
            apiKeyExpiryStatus: false,
            hasKey: false
        };
    },
    watch: {
        oldPassword: function (val) {
            this.fnc_oldPasswordValid(val);
        },
        newPassword: function (val) {
            this.fnc_passwordValid(val);
        },
        confirmNewPassword: function (val) {
            this.fnc_confirmPasswordValid(val);
        },
        keyVisible: function (val) {
            if (this.keyVisible === true) {
                this.showApiKeyText = 'Hide';
            } else {
                this.showApiKeyText = 'Show';
            }
        },
        delPassword: function (val) {
            this.fnc_delPasswordValid(val);
        },
        apiKey: function(val){
            if (val === 'None'){
                this.hasKey = false;
            }else{
                this.hasKey = true;
            }
        }
    },
    mounted: function () {
        document
            .getElementsByClassName(
                'bx--text-input--password__visibility__toggle bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--bottom bx--tooltip--align-center'
            )[0]
            .setAttribute('tabIndex', '-1');
        document
            .getElementsByClassName(
                'bx--text-input--password__visibility__toggle bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--bottom bx--tooltip--align-center'
            )[1]
            .setAttribute('tabIndex', '-1');
        document
            .getElementsByClassName(
                'bx--text-input--password__visibility__toggle bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--bottom bx--tooltip--align-center'
            )[2]
            .setAttribute('tabIndex', '-1');
        document
            .getElementsByClassName(
                'bx--text-input--password__visibility__toggle bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--bottom bx--tooltip--align-center'
            )[3]
            .setAttribute('tabIndex', '-1');
        document
            .getElementsByClassName(
                'bx--text-input--password__visibility__toggle bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--bottom bx--tooltip--align-center'
            )[4]
            .setAttribute('tabIndex', '-1');
        this.apiKey = authInfo().token;
        //Convert Date to readable format.
        let date = new Date(authInfo().apiKeyExpiry);
        this.apiKeyExpiry = date
            .toString()
            .split(':')[0]
            .substring(0, date.toString().split(':')[0].length - 3);
        if (this.apiKey === 'None') {
            this.keyVisible = true;
            this.apiKeyExpiryStatus = false;
            this.hasKey = false;
            console.log("hasKey is false");
        }else{
            this.hasKey = true;
            console.log("hasKey is true");
        }
    },
    methods: {
        showAPIKey() {
            this.keyVisible = !this.keyVisible;
        },
        async copyAPIKey() {
            var dummy = document.createElement('input'),
                text = this.apiKey;
            document.body.appendChild(dummy);
            dummy.value = text;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);

            this.copyLabel = 'Copied';
            await new Promise(resolve => setTimeout(resolve, 10000));
            this.copyLabel = 'Copy';
        },
        fnc_oldPasswordValid(password) {
            if (password.length === 0) {
                this.oldPasswordError = 'Your current password is required';
                this.oldPasswordValid = false;
            } else {
                this.oldPasswordValid = true;
            }
        },
        fnc_passwordValid(password) {
            this.passwordError = '';
            if (password.length < 8) {
                this.passwordError += '\t Password must be at least 8 characters';
                this.newPasswordValid = false;
            } else {
                this.newPasswordValid = true;
            }
            return this.newPasswordValid;
        },
        fnc_confirmPasswordValid(confirmPassword) {
            if (confirmPassword != this.newPassword || confirmPassword.length === 0) {
                this.confirmNewPasswordValid = false;
            } else {
                this.confirmNewPasswordValid = true;
            }
            return this.confirmNewPasswordValid;
        },
        fnc_delPasswordValid(password) {
            if (password.length === 0) {
                this.delPasswordError = 'Your current password is required';
                this.delPasswordValid = false;
            } else {
                this.delPasswordValid = true;
            }
        },
        generateKey() {
            console.log('Generating Key');
            alert("Under Construction. Please use the key as shown above which is regenerated on each login.")
        },
        changePassword() {
            this.fnc_oldPasswordValid(this.oldPassword);
            this.fnc_confirmPasswordValid(this.confirmNewPassword);
            this.fnc_passwordValid(this.newPassword);
            if (
                this.oldPasswordValid &&
                this.newPasswordValid &&
                this.confirmNewPasswordValid
            ) {
                //Check whether password is correct
                //Current password incorrect error should be displayed
                const config = {
                    headers: {
                        Authorization: 'Bearer ' + authInfo().token
                    }
                };
                axios
                    .post(
                        'api/user/change_password', {
                            password: this.oldPassword
                        },
                        config
                    )
                    .then(res => {
                        // Check status for 200 or 400
                        if (res.status === 201) {
                            if (res.data.passCheck === 'Valid Pass') {
                                this.change_pwd_modal = true;
                                this.oldPasswordError = 'Your current password is required';
                                this.oldPasswordValid = true;
                            } else {
                                this.oldPasswordError = "Password doesn't match our records";
                                this.oldPasswordValid = false;
                            }
                        } else {
                            this.oldPasswordError = "Password doesn't match our records";
                            this.oldPasswordValid = false;
                        }
                    })
                    .catch(err => {
                        this.oldPasswordError = "Password doesn't match our records";
                        this.oldPasswordValid = false;
                    });
            }
        },
        changePasswordModel() {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + authInfo().token
                }
            };
            axios
                .post(
                    'api/user/change_password', {
                        password: this.oldPassword,
                        newPassword: this.newPassword
                    },
                    config
                )
                .then(res => {
                    // Check status for 200 or 400
                    if (res.status === 201) {
                        if (res.data.message === 'Password updated') {
                            alert('Password updated.');
                            router.go('/Dashboard');
                        } else {
                            alert(
                                'An error occured changing password. Please try again later'
                            );
                            router.go('/Dashboard');
                        }
                    } else {
                        alert('An error occured changing password. Please try again later');
                        router.go('/Dashboard');
                    }
                })
                .catch(err => {
                    alert('An error occured changing password. Please try again later');
                    router.go('/Dashboard');
                });
        },
        async cancelChangePassword() {
            this.change_pwd_modal = false;
            this.oldPassword = '';
            this.newPassword = '';
            this.confirmNewPassword = '';
            await new Promise(resolve => setTimeout(resolve, 1));
            this.oldPasswordValid = true;
            this.newPasswordValid = true;
            this.confirmNewPasswordValid = true;
        },
        deleteAccount() {
            this.delete_acc_modal = true;
        },
        async cancelDeleteAccount() {
            this.delPassword = '';
            this.delete_acc_modal = false;
            await new Promise(resolve => setTimeout(resolve, 1));
            this.delPasswordValid = true;
        },
        deleteAccountSubmit() {
            this.fnc_delPasswordValid(this.delPassword);
            if (this.delPasswordValid) {
                //Check if password is correct.
                const config = {
                    headers: {
                        Authorization: 'Bearer ' + authInfo().token
                    }
                };
                axios
                    .post(
                        'api/user/change_password', {
                            password: this.delPassword
                        },
                        config
                    )
                    .then(res => {
                        // Check status for 200 or 400
                        if (res.status === 201) {
                            if (res.data.passCheck === 'Valid Pass') {
                                this.delPasswordError = 'Your current password is required';
                                this.delPasswordValid = true;
                                axios
                                    .delete('api/user/delete', config)
                                    .then(res => {
                                        if (res.status === 200) {
                                            if (res.data.message === 'User Deleted') {
                                                localStorage.removeItem('user');
                                                alert('Your account has been deleted successfully.');
                                                router.go('/');
                                            } else {
                                                alert('Error deleting account. Try again later.');
                                                router.go('/Dashboard');
                                            }
                                        }
                                    })
                                    .catch(err => {
                                        alert('Error deleting account. Try again later.');
                                        router.go('/Dashboard');
                                    });
                            } else {
                                this.delPasswordError = "Password doesn't match our records";
                                this.delPasswordValid = false;
                            }
                        } else {
                            this.delPasswordError = "Password doesn't match our records";
                            this.delPasswordValid = false;
                        }
                    })
                    .catch(err => {
                        this.delPasswordError = "Password doesn't match our records";
                        this.delPasswordValid = false;
                    });
            }
        },
        deleteAccountModal() {
            this.delete_acc_modal = true;
        }
    }
};
</script>
