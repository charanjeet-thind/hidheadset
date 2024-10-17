// WLC

import React from 'react';
import { FieldGroup, FormGroup, ControlLabel, FormControl, Row, Col, Radio } from 'react-bootstrap';
import PresenceAppClose from 'components/presence_app/presence_nav/presence_close/';
import FormError from 'components/form_error.jsx';
import Toggle from 'components/react-switch-button.jsx';
const Desktop = global.images((`./${theme}/boomea/desktop-notifications.svg`));

export default class AccountSettingDesktopNotifications extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.submitform = false;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.state = {
      accountsetting: this.props.accountsetting,
      delegated_task_updated: true,
      delegated_status_change: true,
      delegated_near_due: false,
      delegated_near_due_days: 0,
      delegated_past_due: true,
      delegated_past_due_days: 0,
      delegated_request_extension: true,
      delegated_notes: false,
      delegated_response: true,
      own_close_due: false,
      own_close_due_days: 0,
      own_past_due: true,
      own_past_due_days: 0,
      own_task_delegated: false,
      own_task_rescinded: false,
      own_extension_response: true,
      shared_task: false,
      shared_notes: false,
      shared_task_updated: false,
      shared_status_change: false,
    }
  }

  componentWillReceiveProps(props) {
    const that = this;
    if (props.accountsetting.task_notification_settings !== undefined && !props.savingSettings) {
      Object.keys(props.accountsetting.task_notification_settings).forEach(function (key) {
        that.setState({ [key]: props.accountsetting.task_notification_settings[key] });
      });
    }
    if (props.accountsetting !== this.state.accountsetting && !props.savingSettings) {
      that.setState({ accountsetting: props.accountsetting });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let postdata = $('form[name="desktop_notifications"]').serializeArray();
    let post_task_data_obj = {};
    let post_data_array = [];
    let that = this;

    $.map(postdata, function (n, i) {
      if ([n['name']] in that.state) {
        if ([n['name']] == "delegated_near_due_days" || [n['name']] == "delegated_past_due_days" ||
          [n['name']] == "own_close_due_days" || [n['name']] == "own_past_due_days") {
          post_task_data_obj[n['name']] = parseInt(n['value']);
        } else {
          post_task_data_obj[n['name']] = n['value'] ? true : false;
        }
      } else {
        post_data_array.push(postdata[i]);
      }
    });

    post_data_array.push({ name: "task_notification_settings", value: post_task_data_obj })
    this.props.handleSubmit(post_data_array);
  }

  handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (value.length < 4) {
      this.setState({ [name]: value });
    }
  }

  handleOptionChange(e) {
    //this.props.accountsetting[e.target.name] = e.target.value;
    this.setState({
      accountsetting: Object.assign({}, this.state.accountsetting, { [e.target.name]: e.target.value })
    });
  }

  render() {

    let acc_setting = this.state.accountsetting;
    let success = "";
    if (this.props.response.error !== undefined) {
      if (this.props.response.error.message > 0) {
        success = (<div className='alert alert-danger'>{this.props.response.error.message}</div>);
      }
    }
    if (this.props.settingUpdated) {
      success = (<div className='alert alert-success'>Settings saved successfully.</div>);
    }
    let task_notification_settings = null;
    if (this.props.appsPermission.tasks === true) {
      task_notification_settings = (
        <div className="col-sm-6">
          <h3>Task Notifications</h3>
          <h4>Delegated Tasks</h4>

          <div className='form-group'>
            <div className='toggle-group'>
              <Toggle checked={this.state.delegated_task_updated} name='delegated_task_updated'
                onToggle={value => { this.setState({ delegated_task_updated: value }) }} />   Task Updated
              {
                this.state.delegated_task_updated ?
                  <label className='switch-name' htmlFor='delegated_task_updated'>
                    <div className='on'>Enable</div>
                  </label> :
                  <label className='switch-name' htmlFor='delegated_task_updated'>
                    <div className='off'>Disable</div>
                  </label>
              }
            </div>
          </div>

          <div className='form-group'>
            <div className='toggle-group'>
              <Toggle checked={this.state.delegated_status_change} name='delegated_status_change'
                onToggle={value => { this.setState({ delegated_status_change: value }) }} />   Status Changes
              {
                this.state.delegated_status_change ?
                  <label className='switch-name' htmlFor='delegated_status_change'>
                    <div className='on'>Enable</div>
                  </label> :
                  <label className='switch-name' htmlFor='delegated_status_change'>
                    <div className='off'>Disable</div>
                  </label>
              }
            </div>
          </div>

          <div className='form-group'>
            <div className='toggle-group'>
              <Toggle checked={this.state.delegated_near_due} name='delegated_near_due'
                onToggle={value => { this.setState({ delegated_near_due: value }) }} />   Close to Due Date
              {
                this.state.delegated_near_due ?
                  <label className='switch-name' htmlFor='delegated_near_due'>
                    <div className='on'>Enable</div>
                  </label> :
                  <label className='switch-name' htmlFor='delegated_near_due'>
                    <div className='off'>Disable</div>
                  </label>
              }


            </div>
          </div>
          {this.state.delegated_near_due ? (
            <div className='form-group d-block-custm'>
              <div className='toggle-group'>
                <div className="col-xs-3 no-padd-left">
                  <input type="number" value={this.state.delegated_near_due_days} name="delegated_near_due_days" onChange={this.handleInputChange} className="form-control due-date no-margn custom-numbr-control" />
                </div>
                <label htmlFor="due-date">Days Before Due Date</label>
              </div>
            </div>
          ) : null}


          <div className='form-group'>
            <div className='toggle-group'>
              <Toggle checked={this.state.delegated_past_due} name='delegated_past_due'
                onToggle={value => { this.setState({ delegated_past_due: value }) }} />   Past Due

              {
                this.state.delegated_past_due ?
                  <label className='switch-name' htmlFor='delegated_past_due'>
                    <div className='on'>Enable</div>
                  </label> :
                  <label className='switch-name' htmlFor='delegated_past_due'>
                    <div className='off'>Disable</div>
                  </label>
              }
            </div>
          </div>
          {this.state.delegated_past_due ? (
            <div className='form-group d-block-custm'>
              <div className='toggle-group'>
                <div className="col-xs-3 no-padd-left">
                  <input type="number" value={this.state.delegated_past_due_days} name="delegated_past_due_days" onChange={this.handleInputChange} className="form-control due-date no-margn custom-numbr-control" />
                </div>
                <label htmlFor="due-date">Days After Due Date</label>
              </div>
            </div>
          ) : null}

          <div className='form-group'>
            <div className='toggle-group'>
              <Toggle checked={this.state.delegated_request_extension} name='delegated_request_extension'
                onToggle={value => { this.setState({ delegated_request_extension: value }) }} />   Request Extension
              {
                this.state.delegated_request_extension ?
                  <label className='switch-name' htmlFor='delegated_request_extension'>
                    <div className='on'>Enable</div>
                  </label> :
                  <label className='switch-name' htmlFor='delegated_request_extension'>
                    <div className='off'>Disable</div>
                  </label>
              }
            </div>
          </div>

          <div className='form-group'>
            <div className='toggle-group'>
              <Toggle checked={this.state.delegated_response} name='delegated_response'
                onToggle={value => { this.setState({ delegated_response: value }) }} />   Delegation Response
              {
                this.state.delegated_response ?
                  <label className='switch-name' htmlFor='delegated_response'>
                    <div className='on'>Enable</div>
                  </label> :
                  <label className='switch-name' htmlFor='delegated_response'>
                    <div className='off'>Disable</div>
                  </label>
              }
            </div>
          </div>

          <div className='form-group'>
            <div className='toggle-group'>
              <Toggle checked={this.state.delegated_notes} name='delegated_notes'
                onToggle={value => { this.setState({ delegated_notes: value }) }} />   Comments
              {
                this.state.delegated_notes ?
                  <label className='switch-name' htmlFor='delegated_notes'>
                    <div className='on'>Enable</div>
                  </label> :
                  <label className='switch-name' htmlFor='delegated_notes'>
                    <div className='off'>Disable</div>
                  </label>
              }
            </div>
          </div>

          <h4>User's Own Tasks</h4>

          <div className='form-group'>
            <div className='toggle-group'>
              <Toggle checked={this.state.own_close_due} name='own_close_due'
                onToggle={value => { this.setState({ own_close_due: value }) }} />   Close to Due Date
              {
                this.state.own_close_due ?
                  <label className='switch-name' htmlFor='own_close_due'>
                    <div className='on'>Enable</div>
                  </label> :
                  <label className='switch-name' htmlFor='own_close_due'>
                    <div className='off'>Disable</div>
                  </label>
              }
            </div>
          </div>

          {this.state.own_close_due ? (
            <div className='form-group d-block-custm'>
              <div className='toggle-group'>
                <div className="col-xs-3 no-padd-left">
                  <input type="number" value={this.state.own_close_due_days} name="own_close_due_days" onChange={this.handleInputChange} className="form-control due-date no-margn custom-numbr-control" />
                </div>
                <label htmlFor="due-date">Days Before Due Date</label>
              </div>
            </div>
          ) : null}

          <div className='form-group'>
            <div className='toggle-group'>
              <Toggle checked={this.state.own_past_due} name='own_past_due'
                onToggle={value => { this.setState({ own_past_due: value }) }} />   Past Due

              {
                this.state.own_past_due ?
                  <label className='switch-name' htmlFor='own_past_due'>
                    <div className='on'>Enable</div>
                  </label> :
                  <label className='switch-name' htmlFor='own_past_due'>
                    <div className='off'>Disable</div>
                  </label>
              }

            </div>
          </div>
          {this.state.own_past_due ? (
            <div className='form-group d-block-custm'>
              <div className='toggle-group'>
                <div className="col-xs-3 no-padd-left">
                  <input type="number" value={this.state.own_past_due_days} name="own_past_due_days" onChange={this.handleInputChange} className="form-control due-date no-margn custom-numbr-control" />
                </div>
                <label htmlFor="due-date">Days After Due Date</label>
              </div>
            </div>
          ) : null}
          <div className='form-group'>
            <div className='toggle-group'>
              <Toggle checked={this.state.own_task_delegated} name='own_task_delegated'
                onToggle={value => { this.setState({ own_task_delegated: value }) }} />   Task Delegated to You

              {
                this.state.own_task_delegated ?
                  <label className='switch-name' htmlFor='own_task_delegated'>
                    <div className='on'>Enable</div>
                  </label> :
                  <label className='switch-name' htmlFor='own_task_delegated'>
                    <div className='off'>Disable</div>
                  </label>
              }

            </div>
          </div>
          <div className='form-group'>
            <div className='toggle-group'>
              <Toggle checked={this.state.own_task_rescinded} name='own_task_rescinded'
                onToggle={value => { this.setState({ own_task_rescinded: value }) }} />   Task Rescinded

              {
                this.state.own_task_rescinded ?
                  <label className='switch-name' htmlFor='own_task_rescinded'>
                    <div className='on'>Enable</div>
                  </label> :
                  <label className='switch-name' htmlFor='own_task_rescinded'>
                    <div className='off'>Disable</div>
                  </label>
              }

            </div>
          </div>
          <div className='form-group'>
            <div className='toggle-group'>
              <Toggle checked={this.state.own_extension_response} name='own_extension_response'
                onToggle={value => { this.setState({ own_extension_response: value }) }} />   Extension Response

              {
                this.state.own_extension_response ?
                  <label className='switch-name' htmlFor='own_extension_response'>
                    <div className='on'>Enable</div>
                  </label> :
                  <label className='switch-name' htmlFor='own_extension_response'>
                    <div className='off'>Disable</div>
                  </label>
              }

            </div>
          </div>

          <h4>Tasks Shared With Me</h4>

          <div className='form-group'>
            <div className='toggle-group'>
              <Toggle checked={this.state.shared_task} name='shared_task'
                onToggle={value => { this.setState({ shared_task: value }) }} />   Task Shared
              {
                this.state.shared_task ?
                  <label className='switch-name' htmlFor='shared_task'>
                    <div className='on'>Enable</div>
                  </label> :
                  <label className='switch-name' htmlFor='shared_task'>
                    <div className='off'>Disable</div>
                  </label>
              }
            </div>
          </div>
          <div className='form-group'>
            <div className='toggle-group'>
              <Toggle checked={this.state.shared_notes} name='shared_notes'
                onToggle={value => { this.setState({ shared_notes: value }) }} />   Comments
              {
                this.state.shared_notes ?
                  <label className='switch-name' htmlFor='shared_notes'>
                    <div className='on'>Enable</div>
                  </label> :
                  <label className='switch-name' htmlFor='shared_notes'>
                    <div className='off'>Disable</div>
                  </label>
              }
            </div>
          </div>
          <div className='form-group'>
            <div className='toggle-group'>
              <Toggle checked={this.state.shared_task_updated} name='shared_task_updated'
                onToggle={value => { this.setState({ shared_task_updated: value }) }} />   Task Updated
              {
                this.state.shared_task_updated ?
                  <label className='switch-name' htmlFor='shared_task_updated'>
                    <div className='on'>Enable</div>
                  </label> :
                  <label className='switch-name' htmlFor='shared_task_updated'>
                    <div className='off'>Disable</div>
                  </label>
              }
            </div>
          </div>
          <div className='form-group'>
            <div className='toggle-group'>
              <Toggle checked={this.state.shared_status_change} name='shared_status_change'
                onToggle={value => { this.setState({ shared_status_change: value }) }} /> Status Changes
              {
                this.state.shared_status_change ?
                  <label className='switch-name' htmlFor='shared_status_change'>
                    <div className='on'>Enable</div>
                  </label> :
                  <label className='switch-name' htmlFor='shared_status_change'>
                    <div className='off'>Disable</div>
                  </label>
              }
            </div>
          </div>


        </div>
      );
    }
    return (
      <form name="desktop_notifications">
        <div className='accountsettings__content'>
          <div className='content-area'>
            <div className='widget__title'>
              <h2>Desktop notifications</h2> <PresenceAppClose />
            </div>
            <div className='clearfix'></div>
            <div className='scroll-wrapper'>
              <div className='cd-wrapper'>

                <Row className='clearfix'>
                  <Col sm={12}>
                    <div className='fileUploadArea'>
                      <img src={Desktop} className='PicIcon' />
                      {success}
                    </div>

                    <div className='form-section'>
                      <div className='row'>
                        <div className="col-sm-6">
                          <h3>Chat Notifications</h3>
                          <div className='form-group'>
                            <label>Send Desktop Notifications:</label>
                            <label>
                              <input checked={($.trim(acc_setting.desktop_notifications) === "For All Activity")}
                                type="radio"
                                name="desktop_notifications"
                                onChange={this.handleOptionChange}
                                value="For All Activity" /> For All Activity
                            </label>
                            <label>
                              <input checked={($.trim(acc_setting.desktop_notifications) === "Only Mentions and Direct Messages")}
                                type="radio"
                                name="desktop_notifications"
                                onChange={this.handleOptionChange}
                                value="Only Mentions and Direct Messages" /> Only Mentions and Direct Messages
                            </label>
                            <label>
                              <input checked={($.trim(acc_setting.desktop_notifications) === "Never")}
                                type="radio"
                                name="desktop_notifications"
                                onChange={this.handleOptionChange}
                                value="Never" /> Never
                            </label>
                          </div>
                          <div className='form-group'>
                            <label>Sound:</label>
                            <label>
                              <input checked={($.trim(acc_setting.desktop_sound) === "On")}
                                type="radio"
                                name="desktop_sound"
                                onChange={this.handleOptionChange}
                                value="On" /> On
                            </label>
                            <label>
                              <input checked={($.trim(acc_setting.desktop_sound) === "Off")}
                                type="radio"
                                name="desktop_sound"
                                onChange={this.handleOptionChange}
                                value="Off" /> Off
                            </label>
                          </div>

                          <h3>SMS Notifications</h3>
                          <div className='form-group'>
                            <label>Send Desktop Notifications:</label>
                            <label>
                              <input checked={($.trim(acc_setting.sms_desktop_notifications) === "On")}
                                type="radio"
                                name="sms_desktop_notifications"
                                onChange={this.handleOptionChange}
                                value="On" /> On
                            </label>
                            <label>
                              <input checked={($.trim(acc_setting.sms_desktop_notifications) === "Off")}
                                type="radio"
                                name="sms_desktop_notifications"
                                onChange={this.handleOptionChange}
                                value="Off" /> Off
                            </label>
                          </div>
                          <div className='form-group'>
                            <label>Sound:</label>
                            <label>
                              <input checked={($.trim(acc_setting.sms_desktop_sound) === "On")}
                                type="radio"
                                name="sms_desktop_sound"
                                onChange={this.handleOptionChange}
                                value="On" /> On
                            </label>
                            <label>
                              <input checked={($.trim(acc_setting.sms_desktop_sound) === "Off")}
                                type="radio"
                                name="sms_desktop_sound"
                                onChange={this.handleOptionChange}
                                value="Off" /> Off
                            </label>
                          </div>
                        </div>
                        {task_notification_settings}

                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div className='form-button'>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={this.handleSubmit}> UPDATE
            </button>
          </div>
        </div>
      </form>
    );
  }
}
