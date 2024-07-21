// Function to generate HTML for a single slide
function generateSlide(product) {
  return `
          <div class="slide">
            <div class="slid-child-wrap">
              <div class="img-wrap">
                <img class="front-img" src="${product.frontImageUrl}" alt="${product.name}" />
                <img class="back-img" src="${product.backImageUrl}" alt="${product.name}" />
              </div>
              <div class="product-details">
                <h3 class="product-item-desc"> ${product.description}</h3>
                <p class="price-label">Precio Online:S/ ${product.price}</p>
              </div>

              <div class="footer">
              <div class="count-box">
              <span class="count-btn rem-btn">－</span>
              <input type="tel" class="count-input" step="1" value="1" >
              <span class="count-btn add-btn" >＋</span>
              </div>
              <div>
              <div id="cart-button">
              Agregar
              <svg version="1.1" id="shopping_x5F_carts_1_" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 128 128"  xml:space="preserve"><g id="_x33__1_"><path class="st2" d="M51.5 97.4c-5.4 0-9.7 4.4-9.7 9.7 0 5.4 4.4 9.7 9.7 9.7s9.7-4.4 9.7-9.7c0-5.3-4.3-9.7-9.7-9.7zm0 13.9c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2c2.3 0 4.2 1.9 4.2 4.2s-1.9 4.2-4.2 4.2zM19.7 13.4c-.3-1.3-1.4-2.2-2.7-2.2H2.8C1.3 11.2 0 12.4 0 14c0 1.5 1.2 2.8 2.8 2.8h11.9L41 92.4c.3 1.3 1.4 2.2 2.7 2.2h73.1V89H46L19.7 13.4zm84.6 84c-5.4 0-9.7 4.4-9.7 9.7 0 5.4 4.4 9.7 9.7 9.7 5.4 0 9.7-4.4 9.7-9.7.1-5.3-4.3-9.7-9.7-9.7zm0 13.9c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2 4.2 1.9 4.2 4.2-1.8 4.2-4.2 4.2zM33.4 33.4l2.8 5.6h85s-.5 3.4-2.5 8.3H38.3l.7 2.8h78.5c-.9 2-2.1 4.2-3.5 6.5-.4.6-.9 1.2-1.4 1.8H41.1l.7 2.8h67.8c-7 5.6-18.5 8.3-25.6 8.3H44.5h.2-.2l2.8 5.6h33.4c16 0 29.1-4.9 36.2-13.9C126.4 49 128 33.4 128 33.4H33.4zm76.3 27.8 2.7-2.6c-.8.9-1.7 1.8-2.7 2.6z" id="icon_12_"/></g></svg>
              </div>

              </div>
              </div>
              
            </div>
          </div>
        `;
}