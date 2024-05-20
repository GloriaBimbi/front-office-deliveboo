<script></script>

<template>
  <div class="container-fluid top bg-white">
    <!-- go back to homepage on click -->
    <router-link :to="{ name: 'home' }" class="btn back-button mb-2">
      <i class="fa-solid fa-arrow-rotate-left"></i>
      <span class="back-button-label"> Back to Home</span>
    </router-link>
    <div class="logo-wrapper">
      <img src="../../public/blu-bianco-logo.png" alt="" />
    </div>
    <h1 class="text-center">About us:</h1>
  </div>
  <div class="container-fluid bottom">
    <div class="row row-cols-1 row-cols-lg-2 g-3 my-5">
      <div class="col d-flex justify-content-start flex-column">
        <div class="our-mission first p-1 pe-3">
          <h2 class="text-center">Our mission:</h2>

          <p>
            Our mission at <strong class="company-name">Deliveboo</strong> is
            simple yet <strong>vital</strong>: to seamlessly connect you with
            the <strong>flavors</strong> you crave, right at your doorstep. We
            understand the importance of convenience without compromising on
            <strong>taste</strong>, which is why we've curated a diverse
            selection of culinary delights from your favorite
            <strong>local</strong> eateries and beyond. Whether it's a quick
            bite during a busy workday or a leisurely dinner at home, our
            platform ensures that you can
            <strong>enjoy the food you love</strong>, precisely when you desire
            it. With <strong class="company-name">Deliveboo</strong>,
            satisfaction is just a few clicks away.
          </p>
        </div>
        <div class="credits mt-3 pb-5">
          <h2 class="text-center">Credits:</h2>
          <!-- <ul>
            <li>nome 1</li>
            <li>nome 1</li>
            <li>nome 1</li>
            <li>nome 1</li>
            <li>nome 1</li>
          </ul> -->
          <div
            class="credits-wrapper d-flex gap-2 justify-content-start flex-wrap flex-column align-items-center"
          >
            <span>Gloria Bimbi</span>
            <span>Simone Cappadona</span>
            <span>Christian Lepidi</span>
            <span>Giacomo Pisano</span>
            <span>Lorenzo Rossini</span>
          </div>
        </div>
      </div>
      <div class="col second">
        <h2 class="text-center">Our values:</h2>
        <ul>
          <li>
            <strong>Convenience:</strong> We prioritize your convenience by
            offering a fast and efficient service that allows you to enjoy your
            favorite dishes without having to leave your home or office.
          </li>
          <li>
            <strong>Quality:</strong> We partner with the best local restaurants
            to ensure that every meal is prepared with fresh, high-quality
            ingredients, maintaining the authentic flavors you love.
          </li>
          <li>
            <strong>Variety:</strong> We offer a wide range of culinary options
            to satisfy every palate, from local specialties to international
            dishes, ensuring there's always something for everyone.
          </li>

          <li>
            <strong>Sustainability:</strong> We are dedicated to sustainable
            practices, using eco-friendly packaging and partnering with those
            who share our commitment to the environment.
          </li>
          <li>
            <strong>Innovation:</strong> We strive to continuously improve our
            platform and services, adopting new technologies and listening to
            customer feedback to offer a better experience.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-fluid {
  &.top {
    height: 120px;
  }

  position: relative;
  padding-top: 1rem;
  .logo-wrapper {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 75px;
    aspect-ratio: 1/1;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
  h1 {
  }
  .row {
  }
  .first {
    // border-right: 2px solid #0073de;
    background: linear-gradient(#ffffff, #ffffff) 50% 50% / calc(100% - 4px)
        calc(100% - 4px) no-repeat,
      linear-gradient(90deg, transparent 0%, #0073de 100%);
    border-radius: 0px;
    box-sizing: border-box;
    min-height: 200px;
    -webkit-box-shadow: 5px 5px 16px -5px rgba(0, 0, 0, 0.53);
    box-shadow: 13px 5px 16px -5px rgba(0, 0, 0, 0.53);
  }

  .credits {
    background: linear-gradient(#ffffff, #ffffff) 50% 50% / calc(100% - 4px)
        calc(100% - 4px) no-repeat,
      linear-gradient(#48abe0 0%, transparent 100%);
    border-radius: 0px;
    padding: 6px;
    box-sizing: border-box;
    -webkit-box-shadow: 0px -5px 16px 0px rgba(0, 0, 0, 0.53);
    box-shadow: 0px -16px 16px 0px rgba(0, 0, 0, 0.53);
  }
  strong {
    color: #0073de;
    &.company-name {
      font-size: 1.25rem;
    }
  }

  .second {
    background: linear-gradient(#ffffff, #ffffff) 50% 50% / calc(100% - 4px)
        calc(100% - 4px) no-repeat,
      linear-gradient(90deg, #48abe0 0%, transparent 100%);
    border-radius: 0px;
    padding: 6px;
    box-sizing: border-box;
    -webkit-box-shadow: -7px 0px 16px 0px rgba(0, 0, 0, 0.53);
    box-shadow: -7px 0px 16px 0px rgba(0, 0, 0, 0.53);
    li {
      margin-bottom: 1rem;
    }
  }
}
</style>
