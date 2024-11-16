import React, { useEffect, useState } from "react";
import { Grid, Container, Loader, Flex, Select } from "@mantine/core";
import { useDispatch } from "react-redux";
import { SortAscending } from "@phosphor-icons/react";
import CustomBreadcrumbs from "../../../../components/Breadcrumbs.jsx";
import ModuleTabs from "../../../../components/moduleTabs.jsx";
import PCCAdminDashboard from "./PCCAdminDashboard.jsx";
import ManageAttorneyAssignment from "./ManageAttorneyAssignment.jsx";
import ForwardToDirector from "./ForwardToDirector.jsx";
import ReviewApplication from "./ReviewApplicaion.jsx";
import FeedbackViewer from "./FeedbackViewer";
import DownloadsPage from "./DownloadsPage.jsx";
import StatusOfApplications from "./StatusOfApplications.jsx";
import InsightsPage from "./InsightsPage.jsx";

const categories = ["Most Recent", "Tags", "Title"];

function ApplicantMainDashboard() {
  const [activeTab, setActiveTab] = useState("0");
  const [sortedBy, setSortedBy] = useState("Most Recent");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Define your tabs here
  const tabItems = [
    { title: "Dashboard" },
    { title: "New Applications" },
    { title: "Status of Applications" },
    { title: "Manage Attorney" },
    { title: "Forward to Director" },
    { title: "Feedback Viewer" },
    { title: "Downloads" },
    { title: "Insights" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return console.error("No authentication token found!");

      try {
        setLoading(true);
        // Fetch data logic here if needed
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <CustomBreadcrumbs />
      <Flex justify="space-between" align="center" mt="lg">
        <ModuleTabs
          tabs={tabItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          badges={[]}
        />

        <Flex align="center" mt="md" rowGap="1rem" columnGap="4rem" wrap="wrap">
          <Select
            classNames={{
              option: "select-options",
              input: "select-inputs",
            }}
            variant="filled"
            leftSection={<SortAscending />}
            data={categories}
            value={sortedBy}
            onChange={setSortedBy}
            placeholder="Sort By"
          />
        </Flex>
      </Flex>

      {/* Render content based on the active tab */}
      <Grid mt="xl">
        {loading ? (
          <Container py="xl">
            <Loader size="lg" />
          </Container>
        ) : (
          <>
            {activeTab === "0" && (
              <PCCAdminDashboard setActiveTab={setActiveTab} />
            )}
            {activeTab === "1" && (
              <ReviewApplication setActiveTab={setActiveTab} />
            )}
            {activeTab === "2" && (
              <StatusOfApplications setActiveTab={setActiveTab} />
            )}
            {activeTab === "3" && (
              <ManageAttorneyAssignment setActiveTab={setActiveTab} />
            )}
            {activeTab === "4" && (
              <ForwardToDirector setActiveTab={setActiveTab} />
            )}
            {activeTab === "5" && (
              <FeedbackViewer setActiveTab={setActiveTab} />
            )}
            {activeTab === "6" && <DownloadsPage setActiveTab={setActiveTab} />}
            {activeTab === "7" && <InsightsPage setActiveTab={setActiveTab} />}
          </>
        )}
      </Grid>
    </>
  );
}

export default ApplicantMainDashboard;
