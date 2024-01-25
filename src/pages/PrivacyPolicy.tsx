import { Box, Text, Heading } from "@chakra-ui/react";

const PrivacyPolicy = () => {
  return (
    <Box mx={{ base: "5vw", md: "10vw" }}>
      <Heading mb="4">Privacy Policy for WishBnB</Heading>

      <Text>
        This privacy policy describes how "WishBnB" (hereinafter referred to as "we," "us," or "our") collects, uses, and discloses information when you visit our website or use our services.
      </Text>

      <Heading mt="4" mb="2" size="md">
        Information We Collect
      </Heading>

      <Text>
        <strong>Personal Data</strong>
        <br />- <em>Google Login:</em> When you log in using your Google account, we collect certain information from your Google profile according to the permissions you grant. This may include your name, email address, and profile picture.
      </Text>

      <Text mt="2">
        <strong>Other Information</strong>
        <br />- <em>Uploaded Rooms:</em> When you upload rooms on our website, we may collect information about these rooms, including text, images, and metadata.
      </Text>

      <Heading mt="4" mb="2" size="md">
        How We Use Your Information
      </Heading>

      <Text>
        We use the collected information to display personalized content, provide you access to specific features of our website, enhance the quality and performance of our services, and offer relevant support and customer service.
      </Text>

      <Heading mt="4" mb="2" size="md">
        Contact Information
      </Heading>

      <Text>
        For questions about the privacy policy or to exercise your rights, please contact us at:
        <br />
        WishBnB
        <br />
        bischof.david.db@gmail.com
      </Text>

      <Box mt="4" mb="2">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10782.874265782464!2d8.7305643!3d47.4953957!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479a999e9fc4c32d%3A0xc5f240ca8689ae56!2sKantonsschule%20B%C3%BCelrain%20Winterthur%2C%20Wirtschaftsgymnasium%2C%20Handels-%20und%20Informatikmittelschule!5e0!3m2!1sde!2sch!4v1703274295797!5m2!1sde!2sch"
          width="600"
          height="450"
          loading="lazy"
        ></iframe>
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
