import Banner from '../index';
import {h} from "vue";

const BannerDemo = () => {
    return (
        <div>
            <div id="banner-target"></div>
          <br/>
            <Banner type="warning"> banner-warning </Banner>
          <br/>
            <Banner type="danger" onClose={ () => { alert('close'); } }> banner-close-callBack </Banner>

          <br/>
          <Banner
            type="info"
            description="A pre-released version is available."
          />
          <br/>
          <Banner
            type="warning"
            description="This version of the document is going to expire after 4 days."
          />
          <br/>
          <Banner
            type="danger"
            description="This document was deprecated since Jan 1, 2019."
          />
          <br/>
          <Banner
            type="success"
            description="You are viewing the latest version of this document."
          />

          <div style={{ width: '500px', padding: '20px', border: '1px solid var(--semi-color-border)' }}>
            <Banner
              fullMode={false}
              title="Title"
              type="warning"
              bordered
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
            >
              <div class="semi-modal-footer">
                <button class="semi-button semi-button-tertiary semi-button-light" type="button">No, thanks.</button>
                <button class="semi-button semi-button-warning test" type="button">Sounds great!</button>
              </div>
            </Banner>
            <br/>
          </div>
        </div>
    );
};

export default BannerDemo;
