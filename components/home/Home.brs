import "pkg:/source/api/baserequest.brs"
import "pkg:/source/utils/config.brs"
import "pkg:/source/utils/misc.brs"
import "pkg:/source/utils/deviceCapabilities.brs"

sub init()
    m.isFirstRun = true
    m.top.overhangTitle = "Home"
    m.top.optionsAvailable = true
    m.postTask = createObject("roSGNode", "PostTask")

    if m.global.session.user.settings["ui.home.splashBackground"] = true
        m.backdrop = m.top.findNode("backdrop")
        m.backdrop.uri = buildURL("/Branding/Splashscreen?format=jpg&foregroundLayer=0.15&fillWidth=1280&width=1280&fillHeight=720&height=720&tag=splash")
    end if
end sub

sub refresh()
    m.top.findNode("homeRows").callFunc("updateHomeRows")
end sub

sub loadLibraries()
    m.top.findNode("homeRows").callFunc("loadLibraries")
end sub

' JFScreen hook that gets ran as needed.
' Used to update the focus, the state of the data, and tells the server about the device profile
sub OnScreenShown()
    if isValid(m.top.lastFocus)
        m.top.lastFocus.setFocus(true)
    else
        m.top.setFocus(true)
    end if

    refresh()

    ' post the device profile the first time this screen is loaded
    if m.isFirstRun
        m.isFirstRun = false
        m.postTask.arrayData = getDeviceCapabilities()
        m.postTask.apiUrl = "/Sessions/Capabilities/Full"
        m.postTask.control = "RUN"
        m.postTask.observeField("responseCode", "postFinished")
    end if
end sub

' Triggered by m.postTask after completing a post.
' Empty the task data when finished.
sub postFinished()
    m.postTask.unobserveField("responseCode")
    m.postTask.callFunc("empty")
end sub
